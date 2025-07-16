import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDto) {
    // Optionally validate user existence
    const user = await this.prisma.user.findUnique({
      where: { id: data.ownerId },
    });
    if (!user)
      throw new NotFoundException(`User with id ${data.ownerId} not found`);

    return this.prisma.project.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.project.findMany({ where: { isDeleted: false } });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project)
      throw new NotFoundException(`Project with id ${id} not found`);
    return project;
  }
}
