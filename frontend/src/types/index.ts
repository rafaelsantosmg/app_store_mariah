import { Dispatch, SetStateAction } from 'react'
import { Product, ProductSale } from '../interfaces/Products'

export type Order = 'asc' | 'desc'

export type TDataContext = {
  products: Product[]
  setProducts: (products: Product[]) => void
  searchProducts: Product[]
  setSearchProducts: (searchProducts: Product[]) => void
  saleProducts: ProductSale[]
  setSaleProducts: (saleProducts: ProductSale[]) => void
  loading: boolean
  setLoading: (loading: boolean) => void
  openModalSale: boolean
  setOpenModalSale: (value: boolean) => void
}

export type TProviderProps = {
  children: React.ReactNode
}

export type TFormValues = {
  name: string
  description: string
  stock: number
  costPrice: number
  percentage?: number
  salePrice: number
  image?: string
}

export type TFormErrors = {
  name?: string
  description?: string
  stock?: number
  costPrice: number
  percentage?: number
  salePrice: number
  image?: string
}

export type TSelected = {
  id: number
  name: string
}

export type TSaleProduct = {
  productId: number
  quantity: number
}

export type TProduct = {
  id: number
  name: string
  description: string
  stock: number
  costPrice: number
  salePrice: number
}

export type TProductSale = {
  id: number
  name: string
  description: string
  quantity: number
  salePrice: number
}

export type THeader = {
  openModal: (value: boolean) => void
}
