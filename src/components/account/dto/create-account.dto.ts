import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { MessagesHelper } from 'src/helper/messages.helper';
import { RegExHelper } from 'src/helper/regex.helper';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  observation: string;

  @IsNotEmpty()
  @IsString()
  @Matches(RegExHelper.hexColor, {
    message: MessagesHelper.INVALID_COLOR,
  })
  color: string;

  @IsNotEmpty()
  @IsNumber()
  bank: number;
}
