import { IsEmail, Length } from "class-validator";

export class RegistrationDto {
  @Length(3, 20)
  nickname: string;

  @IsEmail()
  email: string;

  @Length(8, 50)
  password: string;
}
