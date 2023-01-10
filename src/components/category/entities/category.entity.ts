import { Exclude } from 'class-transformer';
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
import { TYPE } from '../enum/category-type.enum';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'description' })
  description: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: { INCOME: 'INCOME', EXPENSE: 'EXPENSE' },
  })
  type: TYPE;

  @Column({ name: 'icon', default: null })
  icon: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn({ name: 'user_id' })
  userId: number;

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
