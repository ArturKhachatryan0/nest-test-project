import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtHelperService } from "./jwt.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtHelperService: JwtHelperService, private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const accessToken = this.jwtHelperService.extractAccessTokenFromHeader(request);
    const refreshToken = this.jwtHelperService.extractRefreshTokenFromCookies(request);
    if (!(accessToken && refreshToken)) throw new UnauthorizedException();

    const accessTokenPayload = this.jwtHelperService.decodeAccessToken(accessToken);
    const refreshTokenPayload = this.jwtHelperService.decodeRefreshToken(refreshToken);

    if (accessTokenPayload.error && refreshTokenPayload.error) {
      throw new UnauthorizedException();
    }

    if (accessTokenPayload.error?.name === "TokenExpiredError" && refreshTokenPayload.payload) {
      const newAccessToken = this.jwtHelperService.generateAccessToken({
        _id: refreshTokenPayload.payload._id,
      });
      const newRefreshToken = this.jwtHelperService.generateAccessToken({
        _id: refreshTokenPayload.payload._id,
      });
      const refreshTokenExpires = new Date(Date.now() + this.configService.get("JWT.REFRESH_TOKEN.EXPIRED_IN"));

      response.setHeader("authorization", `Bearer ${newAccessToken}`);
      response.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        expires: refreshTokenExpires,
      });
    }

    request["userId"] = refreshTokenPayload.payload._id;
    return true;
  }
}
