import { Controller, Delete, Get, Post, Req, UseFilters } from "@nestjs/common";
import type { Request } from "express";
import { AppService } from "./app.service";
import { BaseExceptionFilter } from "./exception-filter";

@Controller()
@UseFilters(BaseExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/file")
  async createFile(@Req() req: Pick<Request, "headers" | "body">): Promise<Record<string, unknown>> {
    return await this.appService.createFile(req.headers.authorization, req.body);
  }

  @Get("/file")
  async getFile(@Req() req: Pick<Request, "headers">): Promise<string> {
    return await this.appService.getFile(req.headers.authorization);
  }

  @Delete("/file")
  async deleteFile(@Req() req: Pick<Request, "headers">): Promise<Record<string, unknown>> {
    return await this.appService.deleteFile(req.headers.authorization);
  }
}
