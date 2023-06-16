import { Body, Controller, Post, Res } from "@nestjs/common";
import { LoginDto, RegistrationDto } from "./dto";
import { UsersService } from "../users/users.service";
import { JwtHelperService } from "../jwt/jwt.service";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtHelperService: JwtHelperService,
    private readonly configService: ConfigService,
  ) {}

  @Post("login")
  async login(@Res({ passthrough: true }) response: Response, @Body() loginData: LoginDto): Promise<void> {
    const user = await this.usersService.findOne(loginData);
    if (!user) return null;

    const accessToken = this.jwtHelperService.generateAccessToken({
      _id: user._id,
    });
    const refreshToken = this.jwtHelperService.generateRefreshToken({
      _id: user._id,
    });
    const refreshTokenExpires = new Date(Date.now() + this.configService.get("JWT.REFRESH_TOKEN.EXPIRED_IN"));

    response.setHeader("authorization", `Bearer ${accessToken}`);
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      expires: refreshTokenExpires,
    });
  }

  @Post("registration")
  async registration(
    @Res({ passthrough: true }) response: Response,
    @Body() registrationData: RegistrationDto,
  ): Promise<void> {
    const user = await this.usersService.create(registrationData);
    const accessToken = this.jwtHelperService.generateAccessToken({
      _id: user._id,
    });
    const refreshToken = this.jwtHelperService.generateRefreshToken({
      _id: user._id,
    });
    const refreshTokenExpires = new Date(Date.now() + this.configService.get("JWT.REFRESH_TOKEN.EXPIRED_IN"));

    response.setHeader("authorization", `Bearer ${accessToken}`);
    response.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      expires: refreshTokenExpires,
    });
  }
}
