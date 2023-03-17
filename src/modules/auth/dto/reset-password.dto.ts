import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { UTIL } from '../../../app.utils';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString()
  @Length(8, 24)
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsString()
  @Length(8, 24)
  @IsOptional()
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  confirmPassword: string;
}
