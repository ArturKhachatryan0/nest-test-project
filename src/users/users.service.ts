import { createHash } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./users.schema";
import { CreateUserDto, UpdateUserDto, UniqUserDto, FindOneDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    if (createUserDto.password) {
      createUserDto.password = this.md5(createUserDto.password);
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findOne(filter: FindOneDto): Promise<UserDocument> {
    if (filter.password) {
      filter.password = this.md5(filter.password);
    }
    return this.userModel.findOne(filter).exec();
  }

  async update(_id: Types.ObjectId, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    if (updateUserDto.password) {
      updateUserDto.password = this.md5(updateUserDto.password);
    }
    return this.userModel.findOneAndUpdate({ _id }, updateUserDto, { new: true }).exec();
  }

  async remove(_id: Types.ObjectId): Promise<void> {
    await this.userModel.deleteOne({ _id }).exec();
  }

  async areEmailAndNicknameUniq(userData: UniqUserDto): Promise<boolean> {
    const sameUsersCount = await this.userModel
      .countDocuments({
        $or: [{ nickname: userData.nickname }, { email: userData.email }],
      })
      .exec();
    return sameUsersCount === 0;
  }

  private md5(payload): string {
    return createHash("md5").update(payload).digest("hex");
  }
}
