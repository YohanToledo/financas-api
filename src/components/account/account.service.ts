import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async findAllByUser(userId: number) {
    const accounts = await this.accountRepository.find({
      where: { user: userId },
      relations: ['bank'],
    });

    return accounts;
  }

  async findOneOrFail(options: FindOneOptions<AccountEntity>) {
    try {
      return await this.accountRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async save(data: CreateAccountDto, userId: number) {
    const account = this.accountRepository.create(data);
    account.user = userId;
    const createdAccount = await this.accountRepository
      .save(account)
      .catch((err) => {
        console.log(err);
        throw new BadRequestException('Error to create account');
      });

    return {
      ...createdAccount,
    };
  }

  async update(id: number, data: UpdateAccountDto) {
    const account = await this.findOneOrFail({ where: { id: id } });
    this.accountRepository.merge(account, data);
    const success = await this.accountRepository.save(account);
    if (success) {
      return { message: 'Updated Successfully' };
    }
  }

  async updateBalance(id: number, value: number) {
    const account = await this.findOneOrFail({ where: { id: id } });
    account.balance = Number(account.balance) + Number(value);
    await this.accountRepository.save(account);
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.accountRepository.softDelete({ id });
  }
}
