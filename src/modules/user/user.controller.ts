import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.req.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { userUpdateDto } from './dto/user-update.req.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userCreateDto: UserRegisterDto) {
    return await this.userService.createUser(userCreateDto);
  }
}
