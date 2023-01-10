import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllByUser(userId: number) {
    const categories = await this.categoryRepository.find({
      where: { userId },
      select: { id: true, description: true, type: true },
    });

    return categories;
  }

  async findOneOrFail(options: FindOneOptions<CategoryEntity>) {
    try {
      return await this.categoryRepository.findOneOrFail(options);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async save(data: CreateCategoryDto, userId: number) {
    const category = this.categoryRepository.create(data);
    category.userId = userId;
    const createdCategory = await this.categoryRepository
      .save(category)
      .catch((err) => {
        console.log(err);
        throw new BadRequestException('Error to create category');
      });

    return {
      id: createdCategory.id,
      description: createdCategory.description,
      type: createdCategory.type,
    };
  }

  async update(id: number, data) {
    const category = await this.findOneOrFail({ where: { id: id } });
    this.categoryRepository.merge(category, data);
    const success = await this.categoryRepository.save(category);
    if (success) {
      return { message: 'Updated Successfully' };
    }
  }

  async delete(id: number) {
    await this.findOneOrFail({ where: { id: id } });
    this.categoryRepository.softDelete({ id });
  }
}
