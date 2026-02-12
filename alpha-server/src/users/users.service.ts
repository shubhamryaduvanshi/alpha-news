import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSchema } from './entities/user.entity';
import bcrypt from 'bcrypt'
import { USER_ROLE } from './enums/user.enums';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { CommunicationService } from 'src/communication/communication.service';

const saltRounds = 10;
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly communicationService: CommunicationService
  ) { }

  async create(createUserDto: CreateUserDto) {

    const isExistingUser = await this.userModel.findOne({
      $or: [
        { email: createUserDto.email },
        { mobileNumber: createUserDto.mobileNumber }
      ]
    })

    if (isExistingUser) {
      return { message: 'User with this email or mobile number already exists', error: true };
    }

    const tempPassword = Math.random().toString(30).slice(-10);
    const encryptedPassword = await bcrypt.hash(tempPassword, saltRounds);

    const userPayload: User = {
      ...createUserDto,
      password: encryptedPassword,
      role: USER_ROLE.JOURNALIST
    }

    await this.userModel.create(userPayload);

    this.communicationService.sendEmail({
      to: createUserDto.email,
      subject: 'Welcome to Alpha News',
      body: `Welcome ${createUserDto.name}! Your temporary password is ${tempPassword}. Please login and change your password.`,
      type: 'text',
      template: 'welcome'
    });
    return {
      message: 'User created successfully',
      details: `An email has been sent to ${createUserDto.email} with the temporary password and login instructions. Please check your inbox and follow the instructions to access your account.`
    };
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email })
  }

  updatePassword(userId: string, hashedPassword: string) {
    return this.userModel.updateOne({ _id: userId }, { password: hashedPassword })
  }

  findAll() {
    //TODO: Implement pagination and filtering later
    return this.userModel.find().select('-password');
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
