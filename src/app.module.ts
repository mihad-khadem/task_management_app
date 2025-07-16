// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env and is available everywhere
    PrismaModule, // provides PrismaClient globally
    UsersModule,
    ProjectModule,
    TaskModule,
    CommentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
