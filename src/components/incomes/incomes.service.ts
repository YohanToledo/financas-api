import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOneOptions, Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { Params } from './dto/query-params.dto';
import { AccountService } from '../account/account.service';
import { IncomesEntity } from './entities/incomes.entity';
import { INCOME_STATUS } from './enum/incomes-status.enum';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(IncomesEntity)
    private readonly incomesRepository: Repository<IncomesEntity>,
    private readonly accountService: AccountService,
  ) {}

  async findAllByUser(userId: number, params: Params) {
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);

    let transactionDate = Between(defaultStartDate, new Date());
    if (params.startDate && params.endDate) {
      transactionDate = Between(params.startDate, params.endDate);
    }
    const incomes = await this.incomesRepository.find({
      where: { user: userId, transactionDate },
      relations: ['category', 'account'],
    });

    return incomes;
  }

  async findOneOrFail(options: FindOneOptions<IncomesEntity>) {
    try {
      return await this.incomesRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async save(data: CreateIncomeDto, userId: number) {
    const income = this.incomesRepository.create(data);
    income.user = userId;

    const createdIncome = await this.incomesRepository
      .save(income)
      .catch((err) => {
        console.log(err);
        throw new BadRequestException('Error to create income');
      });

    if (data.status === INCOME_STATUS.RECEIVED) {
      await this.accountService.updateBalance(income.account, income.value);
    }

    return {
      ...createdIncome,
    };
  }

  async update(id: number, data: CreateIncomeDto) {
    const income = await this.findOneOrFail({ where: { id: id } });

    const updatedStatus = {
      RECEIVED: income.value,
      PENDING: -income.value,
    };

    if (data.status !== income.status) {
      await this.accountService.updateBalance(
        income.account,
        updatedStatus[data.status.toString()],
      );
    }

    this.incomesRepository.merge(income, data);
    const success = await this.incomesRepository.save(income);
    if (success) {
      return { message: 'Updated Successfully' };
    }
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.incomesRepository.delete({ id });
  }
}
