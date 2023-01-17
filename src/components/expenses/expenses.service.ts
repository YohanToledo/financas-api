import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOneOptions, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpensesEntity } from './entities/expenses.entity';
import { Params } from './dto/query-params.dto';
import { AccountService } from '../account/account.service';
import { EXPENSE_STATUS } from './enum/expenses-status.enum';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpensesEntity)
    private readonly expensesRepository: Repository<ExpensesEntity>,
    private readonly accountService: AccountService,
  ) {}

  async findAllByUser(userId: number, params: Params) {
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultStartDate.getDate() - 30);

    let transactionDate = Between(defaultStartDate, new Date());
    if (params.startDate && params.endDate) {
      transactionDate = Between(params.startDate, params.endDate);
    }
    const expenses = await this.expensesRepository.find({
      where: { user: userId, transactionDate },
      relations: ['category', 'account'],
    });

    return expenses;
  }

  async findOneOrFail(options: FindOneOptions<ExpensesEntity>) {
    try {
      return await this.expensesRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async save(data: CreateExpenseDto, userId: number) {
    const expense = this.expensesRepository.create(data);
    expense.user = userId;

    const createdExpense = await this.expensesRepository
      .save(expense)
      .catch((err) => {
        console.log(err);
        throw new BadRequestException('Error to create expense');
      });

    if (data.status === EXPENSE_STATUS.PAID) {
      await this.accountService.updateBalance(expense.account, -expense.value);
    }

    return {
      ...createdExpense,
    };
  }

  async update(id: number, data: CreateExpenseDto) {
    const expense = await this.findOneOrFail({ where: { id: id } });

    const updatedStatus = {
      PAID: -expense.value,
      PENDING: expense.value,
    };

    if (data.status !== expense.status) {
      await this.accountService.updateBalance(
        expense.account,
        updatedStatus[data.status.toString()],
      );
    }

    this.expensesRepository.merge(expense, data);
    const success = await this.expensesRepository.save(expense);
    if (success) {
      return { message: 'Updated Successfully' };
    }
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.expensesRepository.delete({ id });
  }
}
