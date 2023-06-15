import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "./users.schema";
import { CreateUserDto, UpdateUserDto, UniqUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(_id: Types.ObjectId): Promise<User> {
    return this.userModel.findOne({ _id }).exec();
  }

  async update(
    _id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ _id }, updateUserDto, { new: true })
      .exec();
  }

  async remove(_id: Types.ObjectId): Promise<void> {
    this.userModel.deleteOne({ _id }).exec();
  }

  async areEmailAndNicknameUniq(userData: UniqUserDto): Promise<boolean> {
    const sameUsersCount = await this.userModel
      .countDocuments({
        $or: [{ nickname: userData.nickname }, { email: userData.email }],
      })
      .exec();
    return sameUsersCount === 0;
  }
}
