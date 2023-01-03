import { compareSync, hashSync } from 'bcrypt';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dto/crete-user.dto';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: [
        'id',
        'fullName',
        'email',
        'createdAt',
        'updatedAt',
        'deletedAt',
      ],
    });
  }
  async findOneOrFail(options: FindOneOptions<UsersEntity>) {
    try {
      return await this.usersRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async save(data: CreateUserDto) {
    const user = this.usersRepository.create(data);
    const createdUser = await this.usersRepository.save(user).catch(() => {
      throw new BadRequestException('Account with this email already exists.');
    });

    return { fulllName: createdUser.fullName, email: createdUser.email };
  }

  async update(id: number, data) {
    const user = await this.findOneOrFail({ where: { id: id } });
    this.usersRepository.merge(user, data);
    const success = await this.usersRepository.save(user);
    if (success) {
      return { message: 'Updated Successfully' };
    }
  }

  async updatePassword(id: number, data: UpdatePasswordDto) {
    const user = await this.findOneOrFail({ where: { id: id } });
    const isPasswordValid = compareSync(data.currentPassword, user.password);
    console.log(isPasswordValid);

    if (isPasswordValid) {
      user.password = hashSync(data.newPassword, 10);
      const successUpdate = await this.usersRepository.save(user);

      if (successUpdate) {
        return;
      }
    } else {
      throw new BadRequestException({
        message: 'currentPassword value does not match current password stored',
      });
    }
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.usersRepository.softDelete({ id });
  }
}
