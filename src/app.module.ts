import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { server, database } from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [server, database],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
