import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale-spun.dto';

type ProductPayload = {
  productId: number;
  quantity: number;
  stockType: string;
};

@Injectable()
export class SalesSpunService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSale: CreateSaleDto) {
    const products = await Promise.all(
      createSale.products.map(async (product: ProductPayload) => {
        const productExist = await this.prisma.products.findUnique({
          where: { id: product.productId },
        });

        const productStock = productExist.stock - product.quantity;
        if (productStock < 0) {
          throw new Error(
            `Product com ID nº ${product.productId} out of stock`,
          );
        }

        return {
          ...productExist,
          quantity: Number(product.quantity),
        };
      }),
    );

    await Promise.all(
      products.map(async (product) => {
        await this.prisma.products.update({
          where: { id: product.id },
          data: {
            stock: product.stock - product.quantity,
          },
        });
      }),
    );

    return products;
  }
}
