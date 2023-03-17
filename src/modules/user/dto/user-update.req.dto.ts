import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UTIL } from '../../../app.utils';

export class userUpdateDto {
  @ApiProperty({
    description: 'New user name',
    example: 'Elon Musk',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'New photo url link',
    example: 'cloudinary.com/tour/3rfdddwdd',
  })
  @IsOptional()
  @IsString()
  photo: string;

  @IsString()
  @Length(8, 24)
  @IsOptional()
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsString()
  @Length(8, 24)
  @IsOptional()
  @Matches(UTIL.PASSWORD_RULE, { message: UTIL.PASSWORD_RULE_MESSAGE })
  confirmPassword: string;
}
