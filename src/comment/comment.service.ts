import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comments.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const { taskId, authorId, content } = createCommentDto;

    // Optional: Validate task and author exist
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    // const author = await this.prisma.user.findUnique({
    //   where: { id: authorId },
    // });

    if (!task) throw new NotFoundException('Task not found');
    // if (!author) throw new NotFoundException('Author not found');

    return this.prisma.comment.create({
      data: {
        content,
        taskId,
        authorId,
      },
    });
  }

  async getAllByTask(taskId: number) {
    return this.prisma.comment.findMany({
      where: { taskId, isDeleted: false },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
