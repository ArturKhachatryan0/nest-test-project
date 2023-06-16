import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { JwtHelperModule } from "../jwt/jwt.module";

@Module({
  imports: [UsersModule, JwtHelperModule, ConfigModule],
  controllers: [AuthController],
  providers: [],
})
export class AuthModule {}
