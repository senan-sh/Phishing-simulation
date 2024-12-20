import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findById(id: string): Promise<User | null> {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    return this.userModel.findById(objectId, { password: 0 }).exec();
  }
  async findByUsername(
    username: string,
  ): Promise<Partial<UserDocument> | null> {
    const user = await this.userModel.findOne({ email: username }).exec();
    if (!user) return null;

    return {
      id: user._id.toString(),
      ...user.toObject(), // Convert Mongoose document to plain object
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const existingUser = await this.userModel
      .findOne({ email: createUserDto.email })
      .exec();
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = new this.userModel({
      name: createUserDto.name,
      surname: createUserDto.surname,
      email: createUserDto.email,
      password: hashedPassword,
      role: 'user',
    });

    return newUser.save();
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }
}
