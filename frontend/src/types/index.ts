import { Dispatch, SetStateAction } from 'react'
import { Product, ProductSale } from '../interfaces/Products'

export type Order = 'asc' | 'desc'

export type TDataContext = {
  dateTime: string
  form: any
  loading: boolean
  openModalSale: boolean
  openModalSaleSpun: boolean
  products: Product[]
  saleProducts: ProductSale[]
  searchProducts: Product[]
  setLoading: (loading: boolean) => void
  setOpenModalSale: (value: boolean) => void
  setOpenModalSaleSpun: (value: boolean) => void
  setProducts: (products: Product[]) => void
  setSaleProducts: (saleProducts: ProductSale[]) => void
  setSearchProducts: (searchProducts: Product[]) => void
}

export type TProviderProps = {
  children: React.ReactNode
}

export type TFormValues = {
  code?: string
  name: string
  description: string
  stockType: string
  stock: string | number
  costPrice: number
  percentage?: number
  salePrice: number
  image?: string
}

export type TFormErrors = {
  name?: string
  description?: string
  stock?: string | number
  costPrice: number
  percentage?: number
  salePrice: number
  image?: string
}

export type TSelected = {
  id: number
  code: string
  name: string
  stockType: string
}

export type TSaleProduct = {
  productId: number
  productCode: string
  quantity: string
  stockType?: string
  productName?: string
  productPrice?: number
}

export type TProduct = {
  code: string
  name: string
  description: string
  stockType: string
  stock: string | number
  costPrice: number
  salePrice: number
}

export type TProductSale = {
  id: number
  code: string
  name: string
  stockType: string
  quantity: string | number
  stock: string | number
  salePrice: number
}

export type THeader = {
  openModalSale: (value: boolean) => void
  openModalSaleSpun: (value: boolean) => void
}
