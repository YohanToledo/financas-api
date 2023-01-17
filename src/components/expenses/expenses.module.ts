import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { ExpensesEntity } from './entities/expenses.entity';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([ExpensesEntity]), AccountModule],
  providers: [ExpensesService],
  controllers: [ExpensesController],
  exports: [ExpensesService],
})
export class ExpensesModule {}
