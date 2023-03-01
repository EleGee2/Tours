import {
  IsOptional,
  IsString,
} from 'class-validator';

export class userUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  photo: string;
}
