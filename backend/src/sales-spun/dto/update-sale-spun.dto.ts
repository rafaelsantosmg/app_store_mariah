import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale-spun.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
