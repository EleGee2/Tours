import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
}
