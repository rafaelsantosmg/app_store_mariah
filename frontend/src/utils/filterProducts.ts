import { Product } from '@/interfaces/Products'

export function filterListProducts(
  products: Product[],
  search: string
): Product[] {
  return products?.filter(
    (product: Product) =>
      product.name.toUpperCase().includes(search?.trim().toUpperCase()) ||
      product.id === Number(search?.trim())
  )
}

export function filterProductsInSale(
  products: Product[],
  search: string
): Product[] {
  return products?.filter((product: Product) => {
    if (isNaN(Number(search?.trim()))) {
      return product.name.toUpperCase().includes(search?.trim().toUpperCase())
    }
    return product.id === Number(search?.trim())
  })
}
