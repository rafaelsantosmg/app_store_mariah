import { Injectable } from '@nestjs/common';
import { CreateDailyMovementDto } from './dto/create-daily_movement.dto';
import { UpdateDailyMovementDto } from './dto/update-daily_movement.dto';

@Injectable()
export class DailyMovementsService {
  create(createDailyMovementDto: CreateDailyMovementDto) {
    console.log(createDailyMovementDto);
  }

  findAll() {
    return `This action returns all dailyMovements`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyMovement`;
  }

  update(id: number, updateDailyMovementDto: UpdateDailyMovementDto) {
    console.log(updateDailyMovementDto);
    return `This action updates a #${id} dailyMovement`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyMovement`;
  }
}
