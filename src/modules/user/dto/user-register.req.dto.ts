import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UserRole } from '../user.entity';
import { UTIL } from '../../../app.utils';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({
    description: 'The name of the user',
    example: 'Elon Musk',
  })
  @IsNotEmpty({ message: 'Please tell us your name ' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
    example: 'elon@yopmail.com',
  })
  @IsNotEmpty({ message: 'Please provide an email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The photo url of the user',
    example: 'cloudinary.com/tours/eijdi3e3ie9',
  })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty({
    description: 'The role of the user',
    example: 'user',
  })
  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Role is either: user, guide, lead-guide or admin',
  })
  role: UserRole;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Password@123',
  })
  @IsString()
  @Length(8, 24)
  @IsNotEmpty()
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  password: string;

  @ApiProperty({
    description: 'Confirm password',
    example: 'Password@123',
  })
  @IsString()
  @Length(8, 24)
  @IsNotEmpty()
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  confirmPassword: string;
}
