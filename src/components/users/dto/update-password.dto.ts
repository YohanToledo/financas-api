import { ApiProperty } from '@nestjs/swagger';
import { Matches, IsNotEmpty, IsOptional } from 'class-validator';
import { MessagesHelper } from 'src/helper/messages.helper';
import { RegExHelper } from 'src/helper/regex.helper';

export class UpdatePasswordDto {

  @ApiProperty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty()
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  @IsNotEmpty()
  newPassword: string;
}
