import { Controller, Get } from '@nestjs/common';

@Controller('/') // this binds to /root path
export class RootController {
  constructor() {}

  @Get('')
  getRoot() {
    return { message: 'Task Management API is running ✅' };
  }
}
