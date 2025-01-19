import { writeFile, readFile, unlink } from "node:fs/promises";
import { HttpException, Injectable } from "@nestjs/common";
import { createHash } from "node:crypto";

const hashAlgo = "sha512";

@Injectable()
export class AppService {
  async createFile(token: string | undefined, file: string): Promise<Record<string, unknown>> {
    if(token === undefined)
      throw new HttpException("No token provided", 400);

    const tokenHash = createHash(hashAlgo).update(token).digest("hex");

    await writeFile(`data/${tokenHash}`, typeof file === "object" ? JSON.stringify(file) : String(file));

    return { error: false, message: "Success" };
  }

  async getFile(token: string | undefined): Promise<string> {
    if(token === undefined)
      throw new HttpException("No token provided", 400);

    const tokenHash = createHash(hashAlgo).update(token).digest("hex");

    try {
      return await readFile(`data/${tokenHash}`, "utf-8");
    }
    catch {
      throw new HttpException("Provided token not found", 400);
    }
  }

  async deleteFile(token: string | undefined): Promise<Record<string, unknown>> {
    if(token === undefined)
      throw new HttpException("No token provided", 400);

    const tokenHash = createHash(hashAlgo).update(token).digest("hex");

    try {
      await unlink(`data/${tokenHash}`);

      return { error: false, message: "Success" };
    }
    catch {
      throw new HttpException("Provided token not found", 400);
    }
  }
}
