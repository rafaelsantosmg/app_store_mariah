import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { PrismaModule } from './database/prisma/prisma.module';
@Module({
  imports: [UserModule, ProductsModule, SalesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
