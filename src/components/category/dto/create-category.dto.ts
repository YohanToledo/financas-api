import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TYPE } from '../enum/category-type.enum';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  @IsEnum(TYPE)
  type: TYPE;
}
