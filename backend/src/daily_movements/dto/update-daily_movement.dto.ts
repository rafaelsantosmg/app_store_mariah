import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyMovementDto } from './create-daily_movement.dto';

export class UpdateDailyMovementDto extends PartialType(CreateDailyMovementDto) {}
