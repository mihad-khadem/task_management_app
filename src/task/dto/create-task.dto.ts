import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus; // default handled in Prisma schema

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority; // default handled in Prisma schema

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsInt()
  projectId: number;

  @IsOptional()
  @IsInt()
  assigneeId?: number;

  // Usually, exclude this from creation DTO
  // @IsOptional()
  // @IsBoolean()
  // isDeleted?: boolean;
}
