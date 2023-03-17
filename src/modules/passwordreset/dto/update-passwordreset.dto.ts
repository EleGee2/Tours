import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString
} from "class-validator";

export class updatePasswordResetDto {
  @IsNotEmpty({ message: 'Token cannot be empty' })
  @IsBoolean()
  used: boolean;
}
