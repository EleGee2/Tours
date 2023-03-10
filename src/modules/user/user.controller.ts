import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user-register.req.dto';
import { ApiTags } from '@nestjs/swagger';
import { User, UserRole } from './user.entity';
import { userUpdateDto } from './dto/user-update.req.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guards';
import { Roles } from '../../common/decorator/roles.decorator';

@ApiTags('User')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async createUser(@Body() userCreateDto: UserRegisterDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Patch()
  async updateUser(@Request() req, @Body() UserUpdateDto: userUpdateDto) {
    return await this.userService.updateUser(req.user.id, UserUpdateDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Delete()
  async deleteUser(@Request() req) {
    return await this.userService.deleteUser(req.user.id);
  }
}
