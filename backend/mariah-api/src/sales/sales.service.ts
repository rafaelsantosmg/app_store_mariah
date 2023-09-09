import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSale: any) {
    const products = await Promise.all(
      createSale.products.map(async (product: any) => {
        const productExist = await this.prisma.products.findUnique({
          where: { id: product.productId },
        });

        const productStock = productExist.stock - product.quantity;

        if (productStock < 1) {
          throw new Error(
            `Product com ID nº ${product.productId} out of stock`,
          );
        }
        return { ...productExist, quantity: product.quantity };
      }),
    );

    const totalPrice = products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    let salesPrice = createSale.discont
      ? totalPrice - (totalPrice * createSale.discont) / 100
      : totalPrice;

    const quantity = createSale.products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);

    const sale = await this.prisma.sales.create({
      data: {
        quantity,
        discont: createSale.discont ? createSale.discont : 0,
        totalPrice,
        salesPrice,
        Products: {
          connect: products.map((product) => ({ id: product.id })),
        },
      },
    });

    await this.createPayment({
      method: createSale.method,
      cardMethod: createSale.cardMethod,
      saleId: sale.id,
    });

    await Promise.all(
      products.map(async (product) => {
        await this.prisma.products.update({
          where: { id: product.id },
          data: { stock: product.stock - product.quantity },
        });
      }),
    );

    return sale;
  }

  async findAll() {
    return await this.prisma.sales.findMany({
      include: {
        Products: true,
        Payments: true,
      },
    });
  }

  async findOne(id: number) {}

  async remove(id: number) {
    return `This action removes a #${id} sale`;
  }

  async createPayment(payment: any) {
    // const sale = await this.prisma.sales.findUnique({
    //   where: { id: payment.saleId },
    // });

    // if (!sale) {
    //   throw new Error(`Sale com ID nº ${payment.saleId} not found`);
    // }

    await this.prisma.payments.create({
      data: {
        method: payment.method ? payment.method : null,
        cardMethod: payment.cardMethod ? payment.cardMethod : null,
        salesId: payment.saleId,
      },
    });
  }
}
