import { Product } from '@/interfaces/Products'

export function filterListProducts(
  products: Product[],
  searchCode: string,
  searchName: string
): Product[] {
  return products?.filter((product: Product) => {
    if (searchCode !== '') {
      return product.code.includes(searchCode?.trim())
    }
    if (searchName !== '') {
      return product.name
        .toUpperCase()
        .includes(searchName?.trim().toUpperCase())
    }
    return product
  })
}

export function filterProductsInSale(
  products: Product[],
  search: string
): Product[] {
  return products?.filter((product: Product) => {
    if (!isNaN(Number(search?.trim()))) {
      return product.code === search?.trim()
    }
    return product.name.toUpperCase().includes(search?.trim().toUpperCase())
  })
}
