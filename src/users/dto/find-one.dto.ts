import { Types } from "mongoose";
import { IsMongoId } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class FindOneDto extends PartialType(CreateUserDto) {
  @IsMongoId()
  _id?: Types.ObjectId;
}
