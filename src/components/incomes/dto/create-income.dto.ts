import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { INCOME_STATUS } from '../enum/incomes-status.enum';

export class CreateIncomeDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  transactionDate: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(INCOME_STATUS)
  status: INCOME_STATUS;

  @IsNotEmpty()
  @IsNumber()
  account: number;

  @IsNotEmpty()
  @IsNumber()
  category: number;
}
