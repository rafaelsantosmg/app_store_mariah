import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const productExist = await this.prisma.products.findFirst({
      where: {
        name: createProductDto.name,
      },
    });

    if (productExist) {
      throw new Error('Product already exists');
    }

    const product = await this.prisma.products.create({
      data: createProductDto,
    });

    return product;
  }

  findAll() {
    return this.prisma.products.findMany();
  }

  findOne(id: number) {
    const product = this.prisma.products.findUnique({ where: { id } });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productExist = this.prisma.products.findFirst({ where: { id } });
    if (!productExist) {
      throw new Error('Product not found');
    }

    return this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    const productExist = this.prisma.products.findFirst({ where: { id } });
    if (!productExist) {
      throw new Error('Product not found');
    }

    return this.prisma.products.delete({ where: { id } });
  }
}
