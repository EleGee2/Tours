import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.req.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/user.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.loginUser(req.user);
  }

  @ApiCreatedResponse({
    description: 'User account created successfully',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'User cannot register, Try again ',
  })
  @Post('register')
  async register(@Body() userDto: UserRegisterDto) {
    return this.authService.registerUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Request() req) {
    return req.user;
  }
}
