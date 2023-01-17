import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TYPE } from 'src/components/category/enum/category-type.enum';
import { STATUS } from 'src/components/expenses/enum/expenses-status.enum';

/**
 * @AUTH
 */
class JwtExampleRes {
  @ApiProperty()
  token: string;
}

class LoginExampleReq {
  @ApiProperty({ default: 'name@example.com' })
  email: string;
  @ApiProperty({ default: 'ABc123!@#' })
  password: string;
}

/**
 * @USERS
 */
class CreateUserExampleReq {
  @ApiProperty({ default: 'David Owen' })
  fullName: string;

  @ApiProperty({ default: 'name@example.com' })
  email: string;

  @ApiProperty({
    description: 'Min 8 chars',
    default: 'ABc123!@#',
  })
  password: string;
}

class UpdateUserExampleReq {
  @ApiPropertyOptional({
    description: 'optional value',
    default: 'David Owen',
  })
  fullName: string;

  @ApiPropertyOptional({
    description: 'optional value',
    default: 'name@example.com',
  })
  email: string;
}

class UserCreatedRes {
  @ApiProperty()
  fullName: string;
  @ApiProperty()
  email: string;
}

class FindUserRes {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  deletedAt?: Date;
}

class UpdatePasswordReq {
  @ApiProperty()
  token: string;
}

/**
 * @CATEGORIES
 */
class CategoryExample {
  @ApiProperty({ default: 'Salario' })
  description: string;
  @ApiProperty({ enum: ['INCOME', 'EXPENSE'] })
  type: TYPE;
  @ApiPropertyOptional()
  icon: string;
}

/**
 * @BANK
 */

class BankExample {
  @ApiProperty({ default: 'Santander' })
  name: string;
}

/**
 * @ACCOUNT
 */
class Account {
  @ApiProperty({ default: 'Meus investimentos' })
  description: string;

  @ApiProperty({ default: 'Detalhes sobre a conta' })
  observation: string;

  @ApiProperty({ default: 0 })
  balance: number;

  @ApiProperty({ default: '#0307fc' })
  color: string;

  @ApiProperty({ default: 1 })
  bank: number;
}

/**
 * @EXPENSES
 */
export class ExpensesDto {
  @ApiProperty({ default: 50 })
  value: number;
  @ApiProperty({ default: 'Compras supermercado' })
  description: string;
  @ApiProperty({ default: new Date().toJSON().split('T') })
  transactionDate: string;
  @ApiProperty({ enum: ['PAID', 'PENDING'] })
  status: STATUS;
  @ApiProperty({ default: 1 })
  account: number;
  @ApiProperty({ default: 1 })
  category: number;
}

export const ResponseAndReturnTypes = {
  LoginExampleReq,
  JwtExampleRes,
  CreateUserExampleReq,
  UpdateUserExampleReq,
  UserCreatedRes,
  FindUserRes,
  UpdatePasswordReq,
  CategoryExample,
  BankExample,
  Account,
  ExpensesDto,
};
