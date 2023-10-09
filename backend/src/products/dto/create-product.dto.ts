export class CreateProductDto {
  name: string;
  description: string;
  costPrice: number;
  salePrice: number;
  stockType: string;
  stock: number;
  image?: string;
}
