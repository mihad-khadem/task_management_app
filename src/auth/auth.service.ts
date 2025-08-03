import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private validatePassword(password: string) {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    if (
      password.length < minLength ||
      !hasNumber ||
      !hasUpper ||
      !hasLower ||
      !hasSpecial
    ) {
      throw new BadRequestException(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
      );
    }
  }

  async signup(signupDto: SignupDto) {
    const { email, name, password } = signupDto;

    // Validate password strength first
    this.validatePassword(password);

    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new BadRequestException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const newUser = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        emailVerified: false,
        emailVerificationToken,
        // you might want to add other fields here too
      },
    });

    // TODO: send verification email with emailVerificationToken link

    return {
      message:
        'User created successfully. Please verify your email to activate your account.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });
    if (!user)
      throw new BadRequestException('Invalid or expired verification token.');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: true, emailVerificationToken: null },
    });

    return { message: 'Email verified successfully' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    if (!user.emailVerified) {
      throw new ForbiddenException(
        'Please verify your email before logging in.',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    // Optionally log last login timestamp here
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      access_token: token,
    };
  }
}
