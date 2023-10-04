import { Product } from '../interfaces/Products'

export type Order = 'asc' | 'desc'

export type TDataContext = {
  products: Product[]
  setProducts: (products: Product[]) => void
  searchProducts: Product[]
  setSearchProducts: (searchProducts: Product[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
}

export type TProviderProps = {
  children: React.ReactNode
}

export type TFormValues = {
  name: string
  description: string
  stock: number
  price: number
  image?: string
}

export type TFormErrors = {
  name?: string
  description?: string
  stock?: number
  price?: number
  image?: string
}
