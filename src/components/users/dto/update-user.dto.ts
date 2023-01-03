import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'optional value',
    default: 'David Owen',
  })
  @IsOptional()
  @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional({
    description: 'optional value',
    default: 'name@example.com',
  })
  @IsOptional()
  @IsNotEmpty()
  email: string;
}
