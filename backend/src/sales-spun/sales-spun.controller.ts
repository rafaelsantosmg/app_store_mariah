import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale-spun.dto';
import { SalesSpunService } from './sales-spun.service';

@Controller('sales-spun')
export class SalesSpunController {
  constructor(private readonly salesSpunService: SalesSpunService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    try {
      return await this.salesSpunService.create(createSaleDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
