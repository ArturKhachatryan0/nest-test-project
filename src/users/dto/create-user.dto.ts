import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 50)
  password: string;
}
