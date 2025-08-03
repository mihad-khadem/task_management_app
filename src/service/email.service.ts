import nodemailer, { Transporter } from 'nodemailer';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Verify your email address',
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
