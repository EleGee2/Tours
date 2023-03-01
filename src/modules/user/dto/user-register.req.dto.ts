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

export class UserRegisterDto {
  @IsNotEmpty({ message: 'Please tell us your name ' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Please provide an email' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  photo: string;

  @IsOptional()
  @IsEnum(UserRole, {
    message: 'Role is either: user, guide, lead-guide or admin',
  })
  role: UserRole;

  @IsString()
  @Length(8, 24)
  @IsNotEmpty()
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsString()
  @Length(8, 24)
  @IsNotEmpty()
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  confirmPassword: string;
}
