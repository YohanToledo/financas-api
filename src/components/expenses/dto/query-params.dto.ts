import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class Params {
  @ApiPropertyOptional({ default: new Date() })
  @IsOptional()
  startDate: Date;
  @ApiPropertyOptional({ default: new Date() })
  @IsOptional()
  endDate: Date;
}
