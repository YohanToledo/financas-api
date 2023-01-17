import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EXPENSE_STATUS } from '../enum/expenses-status.enum';

export class CreateExpenseDto {
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
  @IsEnum(EXPENSE_STATUS)
  status: EXPENSE_STATUS;

  @IsNotEmpty()
  @IsNumber()
  account: number;

  @IsNotEmpty()
  @IsNumber()
  category: number;
}
