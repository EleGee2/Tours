import * as bcrypt from 'bcrypt';
import {
  Injectable,
  PreconditionFailedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dto/user-register.req.dto';
import { userUpdateDto } from './dto/user-update.req.dto';
import { userLoginDto } from './dto/user-login.req.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userData: UserRegisterDto) {
    const checkUser = await this.userRepository.findOne({
      where: [{ name: userData.name }, { email: userData.email }],
    });

    if (checkUser) {
      throw new PreconditionFailedException(
        'This email is already registered with us',
      );
    }

    if (userData.password.toString() !== userData.confirmPassword.toString()) {
      throw new PreconditionFailedException('Passwords do not match');
    }

    const newUser = new User();
    newUser.name = userData.name;
    newUser.email = userData.email;
    newUser.photo = userData.photo;
    newUser.password = userData.password;

    return await newUser.save();
  }

  async findUser(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(`user.email = :email`, { email: email })
      .addSelect(['user.password', 'user.active'])
      .getOne();
  }

  async updateUser(id: string, userUpdateDto: userUpdateDto): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });

    userUpdateDto.name ? (user.name = userUpdateDto.name) : user.name;
    userUpdateDto.photo ? (user.photo = userUpdateDto.photo) : user.photo;

    return await user.save();
  }

  async findUserByLogin({ email, password }: userLoginDto) {
    const user = await this.userRepository
      .createQueryBuilder()
      .where('user.email = :email', { email })
      .select('*')
      .addSelect('user.password', 'currentPassword')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const areEqual = await bcrypt.compare(user.password, password);
    if (!areEqual) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
