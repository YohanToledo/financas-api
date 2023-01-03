import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class LoginExampleReq {
  @ApiProperty({ default: 'name@example.com' })
  email: string;
  @ApiProperty({ default: 'ABc123!@#' })
  password: string;
}

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

class JwtExampleRes {
  @ApiProperty()
  token: string;
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

export const ResponseAndReturnTypes = {
  LoginExampleReq,
  JwtExampleRes,
  CreateUserExampleReq,
  UpdateUserExampleReq,
  UserCreatedRes,
  FindUserRes,
  UpdatePasswordReq,
};
