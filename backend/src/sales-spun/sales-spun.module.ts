import { Module } from '@nestjs/common';
import { SalesSpunService } from './sales-spun.service';
import { SalesSpunController } from './sales-spun.controller';

@Module({
  controllers: [SalesSpunController],
  providers: [SalesSpunService],
})
export class SalesSpunModule {}
