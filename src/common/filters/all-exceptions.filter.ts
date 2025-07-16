import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getStatusCode(exception);
    const message = this.getErrorMessage(exception);

    this.logger.error(
      `Status: ${status} Error: ${JSON.stringify(message)}`,
      this.getStack(exception),
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toLocaleString('en-BD', {
        timeZone: 'Asia/Dhaka',
        hour12: false,
      }),
      path: request.url,
      error: typeof message === 'string' ? { message } : message,
    });
  }

  private getStatusCode(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getErrorMessage(exception: unknown): string | object {
    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'string') return res;

      if (typeof res === 'object' && res !== null) {
        // Nest ValidationPipe errors come in this structure
        if ('message' in res && 'errors' in res) {
          return res;
        }

        // Fallback if only "message" exists
        if ('message' in res) {
          const msg = (res as any).message;
          if (typeof msg === 'string' || Array.isArray(msg)) {
            return { message: 'Validation failed', errors: msg };
          }
        }

        return res;
      }

      return exception.message;
    }

    if (exception instanceof Error) {
      return exception.message;
    }

    return 'Internal server error';
  }

  private getStack(exception: unknown): string | undefined {
    if (exception instanceof Error) {
      return exception.stack;
    }
    return undefined;
  }
}
