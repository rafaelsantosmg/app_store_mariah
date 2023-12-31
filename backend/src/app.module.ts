import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { PrismaModule } from './database/prisma/prisma.module';
import { SalesSpunModule } from './sales-spun/sales-spun.module';
import { DailyMovementsModule } from './daily_movements/daily_movements.module';
@Module({
  imports: [
    UserModule,
    ProductsModule,
    SalesModule,
    SalesSpunModule,
    PrismaModule,
    DailyMovementsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
