// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/user.module';
// import { ProjectsModule } from './projects/projects.module';
// import { TasksModule } from './tasks/tasks.module';
// import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // loads .env and is available everywhere
    PrismaModule, // provides PrismaClient globally
    UsersModule,
    // ProjectsModule,
    // TasksModule,
    // CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
