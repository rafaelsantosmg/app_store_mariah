import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

type ProductPayload = {
  productId: number;
  quantity: number;
  stockType: string;
  productName?: string;
  productPrice?: number;
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
    const products = await Promise.all(
      createSale.products.map(async (product: ProductPayload) => {
        const productExist = await this.prisma.products.findUnique({
          where: { id: product.productId },
        });
        console.log(productExist);

        const productStock = productExist.stock - product.quantity;
        if (productStock < 0) {
          throw new Error(
            `Product com ID nº ${product.productId} out of stock`,
          );
        }

        const productPrice =
          product.productName === 'DIVERSOS'
            ? product.productPrice
            : productExist.salePrice;

        return {
          ...productExist,
          quantity: Number(product.quantity),
          salePrice: productPrice,
        };
      }),
    );

    console.log(products);

    const totalPrice = products.reduce((acc, product) => {
      return acc + product.salePrice * product.quantity;
    }, 0);

    console.log(totalPrice);

    const salesPrice = createSale.discont
      ? totalPrice - (totalPrice * createSale.discont) / 100
      : totalPrice;

    const sale = await this.prisma.sales.create({
      data: {
        discount: createSale.discont ? createSale.discont : 0,
        totalPrice,
        salesPrice,
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
          data: {
            stock: product.stock - product.quantity,
          },
        });
      }),
    );

    await Promise.all(
      createSale.products.map(async (product) => {
        await this.prisma.salesProduct.create({
          data: {
            saleId: sale.id,
            productId: product.productId,
            quantity: product.quantity,
          },
        });
      }),
    );

    return sale;
  }

  async findAll() {
    return await this.prisma.sales.findMany({
      include: {
        SalesProducts: true,
        Payments: true,
      },
    });
  }

  async findOne(id: number) {
    const sale = await this.prisma.sales.findUnique({
      where: { id },
      include: {
        SalesProducts: true,
        Payments: true,
      },
    });

    if (!sale) {
      throw new Error('Sale not found');
    }

    const SalesProducts = await Promise.all(
      sale.SalesProducts.map(async ({ productId, quantity, saleId }) => {
        const { name } = await this.prisma.products.findUnique({
          where: { id: productId },
          select: { name: true },
        });
        return {
          productId,
          quantity,
          saleId,
          productName: name,
        };
      }),
    );

    return { ...sale, SalesProducts };
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
