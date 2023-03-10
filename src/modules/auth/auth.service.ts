import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { userLoginDto } from '../user/dto/user-login.req.dto';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRegisterDto } from '../user/dto/user-register.req.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findUser(email);

    if (!user) {
      throw new BadRequestException();
    }

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async loginUser(user: any) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(userDto: UserRegisterDto) {
    const user = await this.userService.createUser(userDto);

    delete user.password;
    return user;
  }
}
