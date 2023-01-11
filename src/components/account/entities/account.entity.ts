import { Exclude } from 'class-transformer';
import { BankEntity } from 'src/components/bank/entities/bank.entity';
import { UsersEntity } from 'src/components/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  description: string;

  @Column()
  observation: string;

  @Column({ default: 0 })
  balance: number;

  @Column()
  color: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @ManyToOne(() => BankEntity)
  @JoinColumn({ name: 'bank_id' })
  bank: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @Exclude()
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  @Exclude()
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}
