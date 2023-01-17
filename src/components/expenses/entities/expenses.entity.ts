import { CategoryEntity } from 'src/components/category/entities/category.entity';
import { UsersEntity } from 'src/components/users/entities/users.entity';
import { AccountEntity } from 'src/components/account/entities/account.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { STATUS } from '../enum/expenses-status.enum';

@Entity({ name: 'expenses' })
export class ExpensesEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: number;

  @Column()
  description: string;

  @Column({ name: 'transaction_date', type: 'timestamp' })
  transactionDate: Date;

  @Column({
    name: 'status',
    type: 'enum',
    enum: { PAID: 'PAID', PENDING: 'PENDING' },
  })
  status: STATUS;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: 'account_id' })
  account: number;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt?: Date;
}
