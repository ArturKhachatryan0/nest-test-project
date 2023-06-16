import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtHelperService } from "./jwt.service";
import { ConfigModule } from "@nestjs/config";
import { JwtGuard } from "./jwt.guard";

@Module({
  imports: [JwtModule, ConfigModule],
  exports: [JwtHelperService, JwtGuard],
  providers: [JwtHelperService, JwtGuard],
})
export class JwtHelperModule {}
