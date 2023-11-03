import { Module } from '@nestjs/common';
import { DailyMovementsService } from './daily_movements.service';
import { DailyMovementsController } from './daily_movements.controller';

@Module({
  controllers: [DailyMovementsController],
  providers: [DailyMovementsService],
})
export class DailyMovementsModule {}
