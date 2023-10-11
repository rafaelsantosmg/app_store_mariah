export class CreateSaleDto {
  products: SalesProducts[];
  discont?: number;
  paymentMethod?: string;
  paymentInstallment?: string;
}

class SalesProducts {
  productId: number;
  quantity: number;
  stockType: string;
  productName?: string;
  productPrice?: number;
}
