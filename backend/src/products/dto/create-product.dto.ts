export class CreateProductDto {
  code: string;
  name: string;
  description: string;
  costPrice: number;
  salePrice: number;
  stockType: string;
  stock: number;
  image?: string;
}
