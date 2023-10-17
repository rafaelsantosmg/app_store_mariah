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
      data: {
        ...createProductDto,
        profitMargin: createProductDto.salePrice - createProductDto.costPrice,
        stock: createProductDto.stock,
      },
    });

    return product;
  }

  async findAll() {
    return await this.prisma.products.findMany({ orderBy: { code: 'asc' } });
  }

  async findOne(id: number) {
    const product = await this.prisma.products.findUnique({
      where: { id },
      include: {
        SalesProducts: true,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const productExist = await this.prisma.products.findFirst({
      where: { id },
    });
    if (!productExist) {
      throw new Error('Product not found');
    }
    return this.prisma.products.update({
      where: { id },
      data: {
        ...updateProductDto,
        stock: updateProductDto.stock,
      },
    });
  }

  async remove(id: number) {
    const productExist = await this.prisma.products.findFirst({
      where: { id },
    });
    if (!productExist) {
      throw new Error('Product not found');
    }

    return this.prisma.products.delete({ where: { id } });
  }
}
