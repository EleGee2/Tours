import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dto/user-register.req.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { CreateForgetPasswordDto } from './dto/forgot-password.dto';
import { Throttle } from '@nestjs/throttler';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { userUpdateDto } from '../user/dto/user-update.req.dto';

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
  @UsePipes(ValidationPipe)
  async register(@Body() userDto: UserRegisterDto) {
    return this.authService.registerUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Request() req) {
    return req.user;
  }

  @Get('confirm')
  async verifyMe(@Query('token') token: string) {
    return this.authService.confirmUser(token);
  }

  @Post('/forgot-password')
  @UsePipes(ValidationPipe)
  @Throttle(1, 60 * 60 * 24)
  async forgotPassword(@Body() email: CreateForgetPasswordDto) {
    return this.authService.forgotPassword(email);
  }

  @Post('/reset-password')
  @UsePipes(ValidationPipe)
  async resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update-password')
  async updatePassword(
    @Request() req,
    @Body() updatePasswordDto: userUpdateDto,
  ) {
    return this.authService.updatePassword(req.user, updatePasswordDto);
  }
}
