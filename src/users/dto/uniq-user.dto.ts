import { IsEmail, IsString, Length } from "class-validator";

export class UniqUserDto {
  @IsString()
  @Length(3, 20)
  nickname: string;

  @IsEmail()
  email: string;
}
