import { IsNotEmpty, IsString } from 'class-validator';

export class BankDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
