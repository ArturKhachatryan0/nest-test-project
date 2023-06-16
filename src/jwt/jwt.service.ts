import { Injectable } from "@nestjs/common";
import { JwtService, JwtVerifyOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtHelperService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  private decodeJwtToken(token: string, options: JwtVerifyOptions): { payload: any; error: Error | null } {
    const result = {
      payload: null,
      error: null,
    };
    try {
      result.payload = this.jwtService.verify(token, options);
    } catch (error) {
      result.error = error;
    }
    return result;
  }

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT.ACCESS_TOKEN.SECRET"),
      expiresIn: this.configService.get("JWT.ACCESS_TOKEN.EXPIRED_IN"),
    });
  }

  generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get("JWT.REFRESH_TOKEN.SECRET"),
      expiresIn: this.configService.get("JWT.REFRESH_TOKEN.EXPIRED_IN"),
    });
  }

  decodeAccessToken(token: string) {
    return this.decodeJwtToken(token, {
      secret: this.configService.get("JWT.ACCESS_TOKEN.SECRET"),
    });
  }

  decodeRefreshToken(token: string) {
    return this.decodeJwtToken(token, {
      secret: this.configService.get("JWT.REFRESH_TOKEN.SECRET"),
    });
  }

  extractAccessTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers["authorization"]?.split(" ") ?? [];
    return type === "Bearer" ? token : null;
  }

  extractRefreshTokenFromCookies(request: Request): string | undefined {
    return request["cookies"]["refresh_token"];
  }
}
