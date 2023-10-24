import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DailyMovementsService } from './daily_movements.service';
import { UpdateDailyMovementDto } from './dto/update-daily_movement.dto';
import { CreateDailyMovementDto } from './dto/create-daily_movement.dto';

@Controller('daily-movements')
export class DailyMovementsController {
  constructor(private readonly dailyMovementsService: DailyMovementsService) {}

  @Post()
  create(@Body() createDailyMovementDto: CreateDailyMovementDto) {
    return this.dailyMovementsService.create(createDailyMovementDto);
  }

  @Get()
  findAll() {
    return this.dailyMovementsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dailyMovementsService.findOne(+id);
  }

  @Get('/moviment-day/:date')
  async findMovimentDate(@Param('date') date: Date) {
    return await this.dailyMovementsService.findDayMoviment(date);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyMovementDto: UpdateDailyMovementDto,
  ) {
    return this.dailyMovementsService.update(+id, updateDailyMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyMovementsService.remove(+id);
  }
}
