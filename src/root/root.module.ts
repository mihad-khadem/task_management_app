import { Module } from '@nestjs/common';
import { RootController } from './root.controller';
// root module
@Module({
  controllers: [RootController],
})
export class RootModule {}
