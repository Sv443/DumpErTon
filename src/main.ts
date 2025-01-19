import { statSync, mkdirSync } from "node:fs";
import { NestFactory } from "@nestjs/core";
import "dotenv/config";
import { AppModule } from "./app.module";

const ensureDirs = [
  "data",
];

for(const dir of ensureDirs) {
  try {
    if(!statSync(dir).isDirectory())
      throw "";
  }
  catch {
    mkdirSync(dir);
  }
}

async function init() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

init();
