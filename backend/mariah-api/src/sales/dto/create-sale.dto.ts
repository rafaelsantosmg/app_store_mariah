export class CreateSaleDto {
  products: SalesProducts[];
  discont?: number;
  method?: string;
  cardMethod?: string;
}

class SalesProducts {
  productId: number;
  quantity: number;
}
