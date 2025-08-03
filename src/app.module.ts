// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/user.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
// import { RootController } from './root/root.controller';
import { RootModule } from './root/root.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env and is available everywhere
    PrismaModule, // provides PrismaClient globally
    UsersModule,
    ProjectModule,
    TaskModule,
    CommentModule,
    RootModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
