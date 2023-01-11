import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './components/account/account.module';
import { BankModule } from './components/bank/bank.module';
import { CategoryModule } from './components/category/category.module';
import { UsersModule } from './components/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: true,
      dropSchema: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    } as TypeOrmModuleOptions),
    AuthModule,
    UsersModule,
    CategoryModule,
    BankModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
