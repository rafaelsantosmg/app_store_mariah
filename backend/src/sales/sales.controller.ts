import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    try {
      return await this.salesService.create(createSaleDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.salesService.findOne(Number(id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('by-date/:date')
  async findByDate(@Param('date') date: string) {
    try {
      return await this.salesService.findByDate(date);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.salesService.remove(Number(id));
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
