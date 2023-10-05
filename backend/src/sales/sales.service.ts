import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

type ProductPayload = {
  productId: number;
  quantity: number;
};

type PaymentPayload = {
  paymentMethod?: string;
  paymentInstallment?: string;
  saleId: number;
};

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSale: CreateSaleDto) {
    console.log(createSale);
    const products = await Promise.all(
      createSale.products.map(async (product: ProductPayload) => {
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
      return acc + product.price * product.quantity;
    }, 0);

    const salesPrice = createSale.discont
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
      paymentMethod: createSale.paymentMethod ? createSale.paymentMethod : null,
      paymentInstallment: createSale.paymentInstallment
        ? createSale.paymentInstallment
        : null,
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

  async findOne(id: number) {
    const sale = await this.prisma.sales.findUnique({
      where: { id },
      include: {
        Products: true,
        Payments: true,
      },
    });

    if (!sale) {
      throw new Error('Sale not found');
    }

    return sale;
  }

  async remove(id: number) {
    const sale = await this.prisma.sales.findUnique({ where: { id } });

    if (!sale) {
      throw new Error('Sale not found');
    }

    return await this.prisma.sales.delete({
      where: { id },
    });
  }

  async createPayment(payment: PaymentPayload) {
    await this.prisma.payments.create({
      data: {
        method: payment.paymentMethod ? payment.paymentMethod : null,
        installment: payment.paymentInstallment
          ? payment.paymentInstallment
          : null,
        salesId: payment.saleId,
      },
    });
  }
}
