export class CreateProductDto {
  name: string;
  description: string;
  costPrice: number;
  salePrice: number;
  stock: number;
  image?: string;
}
