import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { BankDto } from './dto/bank.dto';
import { BankEntity } from './entities/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(BankEntity)
    private readonly bankRepository: Repository<BankEntity>,
  ) {}

  async findAll() {
    return this.bankRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<BankEntity>) {
    try {
      return await this.bankRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async save(data: BankDto) {
    const bank = this.bankRepository.create(data);
    const createdBank = await this.bankRepository.save(bank).catch(() => {
      throw new BadRequestException('Error to create bank');
    });

    return {
      ...createdBank,
    };
  }

  async update(id: number, data) {
    const bank = await this.findOneOrFail({ where: { id: id } });
    this.bankRepository.merge(bank, data);
    const success = await this.bankRepository.save(bank);
    if (success) {
      return { message: 'Updated Successfully' };
    }
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.bankRepository.softDelete({ id });
  }
}
