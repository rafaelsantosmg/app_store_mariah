export interface Product {
  id: number
  name: string
  description: string
  stockType: string
  stock: number
  costPrice: number
  salePrice: number
}

export interface ProductSale {
  id: number
  name: string
  description: string
  quantity: string | number
  costPrice: number
  salePrice: number
}
