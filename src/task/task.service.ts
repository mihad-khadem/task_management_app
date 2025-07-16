import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // Check if project exists (optional but good for data integrity)
    const projectExists = await this.prisma.project.findUnique({
      where: { id: createTaskDto.projectId },
    });
    if (!projectExists) {
      throw new NotFoundException(
        `Project with id ${createTaskDto.projectId} not found`,
      );
    }

    // Optional: Check if assignee exists if provided
    if (createTaskDto.assigneeId) {
      const userExists = await this.prisma.user.findUnique({
        where: { id: createTaskDto.assigneeId },
      });
      if (!userExists) {
        throw new NotFoundException(
          `User with id ${createTaskDto.assigneeId} not found`,
        );
      }
    }

    // Create the task
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status ?? undefined, // Prisma default will apply if undefined
        priority: createTaskDto.priority ?? undefined,
        dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
        project: {
          connect: { id: createTaskDto.projectId },
        },
        assignee: createTaskDto.assigneeId
          ? { connect: { id: createTaskDto.assigneeId } }
          : undefined,
        // isDeleted will default to false via Prisma schema
      },
    });

    return task;
  }
}
