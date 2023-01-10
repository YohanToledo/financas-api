import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TYPE } from 'src/components/category/enum/category-type.enum';

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

export const ResponseAndReturnTypes = {
  LoginExampleReq,
  JwtExampleRes,
  CreateUserExampleReq,
  UpdateUserExampleReq,
  UserCreatedRes,
  FindUserRes,
  UpdatePasswordReq,
  CategoryExample,
};
