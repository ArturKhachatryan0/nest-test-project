import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as process from "process";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
