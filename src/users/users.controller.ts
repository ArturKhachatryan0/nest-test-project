import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { JwtGuard } from "../jwt/jwt.guard";

@UseGuards(JwtGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isUserDataUniq = await this.usersService.areEmailAndNicknameUniq(createUserDto);
    if (!isUserDataUniq) return null;
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") _id: Types.ObjectId) {
    return this.usersService.findOne({ _id });
  }

  @Patch(":id")
  async update(@Param("id") _id: Types.ObjectId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(_id, updateUserDto);
  }

  @Delete(":id")
  async remove(@Param("id") _id: Types.ObjectId) {
    return this.usersService.remove(_id);
  }
}
