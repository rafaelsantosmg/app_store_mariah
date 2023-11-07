import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateDailyMovementDto } from './dto/create-daily_movement.dto';
import { UpdateDailyMovementDto } from './dto/update-daily_movement.dto';

type Methods = {
  pix: number;
  money: number;
  debit_card: number;
  credit_card: number;
};
@Injectable()
export class DailyMovementsService {
  constructor(private prisma: PrismaService) {}
  async create(createDailyMovementDto: CreateDailyMovementDto) {
    const initialDate = new Date(createDailyMovementDto.initialDate);
    const finalDate = new Date(createDailyMovementDto.finalDate);

    const result = await this.returnOfTheTotalValuePerMethod(
      initialDate,
      finalDate,
    );
    const dailyMovements = await this.prisma.dailyMovements.create({
      data: {
        totalSales: Number(result.totalDayMoviment),
        cashSales: result.money,
        pixSales: result.pix,
        debitCardSales: result.debit_card,
        creditCardSalesCash: result.credit_card,
        creditCardsSalesInstallment: result.creditCardsInstallment,
      },
    });
    return {
      ...dailyMovements,
      totalSales: Number(dailyMovements.totalSales.toFixed(2)),
    };
  }

  findAll() {
    return `This action returns all dailyMovements`;
  }

  async findOne(id: number) {
    return `This action returns a ${id} dailyMovement`;
  }

  update(id: number, updateDailyMovementDto: UpdateDailyMovementDto) {
    console.log(updateDailyMovementDto);
    return `This action updates a #${id} dailyMovement`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyMovement`;
  }

  async findAllSalesPerDayMoviment(initialDate: Date, finalDate: Date) {
    return await this.prisma.sales.findMany({
      where: {
        createdAt: {
          gte: initialDate,
          lte: finalDate,
        },
      },
      include: {
        Payments: true,
      },
    });
  }

  async findDayMoviment(movimentDate: Date) {
    const initialDate = format(
      new Date(movimentDate),
      'yyyy-MM-dd 00:00:00.SSS',
    );
    const finalDate = format(new Date(movimentDate), 'yyyy-MM-dd 23:59:59.SSS');

    console.log(initialDate, finalDate);

    const moviment = await this.prisma.dailyMovements.findMany({
      where: {
        createdAt: {
          gte: initialDate,
          lte: finalDate,
        },
      },
    });

    return moviment;
  }

  async returnOfTheTotalValuePerMethod(initialDate: Date, finalDate: Date) {
    const sales = await this.findAllSalesPerDayMoviment(initialDate, finalDate);
    const methods = ['pix', 'money', 'debit_card', 'credit_card'];

    const result = methods.reduce((acc, method) => {
      const sale = sales
        .filter((sale) => sale.Payments.some((p) => p.method === method))
        .reduce((acc, curr) => acc + curr.totalPrice, 0);
      return {
        ...acc,
        [method]: sale,
      };
    }, {}) as Methods;

    const creditCardsInstallment = sales
      .filter((sale) =>
        sale.Payments.some(
          (p) => p.method === 'credit_card' && p.installment !== 'in_cash',
        ),
      )
      .reduce((acc, curr) => {
        const qtd = curr.Payments.find((p) => p.installment !== 'in_cash');

        return acc + curr.totalPrice / Number(qtd.installment.replace('x', ''));
      }, 0);

    const totalDayMoviment =
      result.pix + result.money + result.credit_card + result.debit_card;
    return {
      ...result,
      creditCardsInstallment,
      totalDayMoviment,
    };
  }
}
