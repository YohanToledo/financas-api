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

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpensesEntity)
    private readonly expensesRepository: Repository<ExpensesEntity>,
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

    return {
      ...createdExpense,
    };
  }

  async update(id: number, data: CreateExpenseDto) {
    const account = await this.findOneOrFail({ where: { id: id } });
    this.expensesRepository.merge(account, data);
    const success = await this.expensesRepository.save(account);
    if (success) {
      return { message: 'Updated Successfully' };
    }
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.expensesRepository.delete({ id });
  }
}
