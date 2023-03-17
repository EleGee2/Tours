import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateForgetPasswordDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  email: string;
}
