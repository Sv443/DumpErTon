import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "node:crypto";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return \"Hello World!\"", async () => {
      const authorization = `test-${randomUUID()}`;

      expect(
        await appController.createFile({
          headers: { authorization },
          body: "Hello World!",
        })
      ).toHaveProperty("error", false);

      expect(
        await appController.getFile({
          headers: { authorization },
        })
      ).toBe("Hello World!");

      expect(
        await appController.deleteFile({
          headers: { authorization },
        })
      ).toHaveProperty("error", false);
    });
  });
});
