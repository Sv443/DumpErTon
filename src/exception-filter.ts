import { Catch, HttpException, type ArgumentsHost, type ExceptionFilter } from "@nestjs/common";

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception instanceof Error ? exception.message : "Internal server error";

    response.status(status).json({
      error: true,
      message: message,
    });
  }
}
