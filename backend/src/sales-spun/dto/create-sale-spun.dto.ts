export class CreateSaleDto {
  products: SalesProducts[];
}

class SalesProducts {
  productId: number;
  quantity: number;
  stockType: string;
}
