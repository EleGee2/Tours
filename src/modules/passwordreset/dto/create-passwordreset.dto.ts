import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';

export class createPasswordResetDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Token cannot be empty' })
  @IsString()
  token: string;

  @IsUUID()
  @IsNotEmpty({ message: 'owner id cannot be empty' })
  owner: string;
}
