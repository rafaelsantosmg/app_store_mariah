import { createContext, useState } from 'react'

import { Product, ProductSale } from '../../interfaces/Products'
import { TDataContext, TProviderProps } from '../../types'

export const DataContext = createContext<TDataContext>({} as TDataContext)

export const DataProvider = ({ children }: TProviderProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchProducts, setSearchProducts] = useState<Product[]>([])
  const [saleProducts, setSaleProducts] = useState<ProductSale[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openModalSale, setOpenModalSale] = useState(false)
  return (
    <DataContext.Provider
      value={{
        openModalSale,
        setOpenModalSale,
        products,
        setProducts,
        searchProducts,
        setSearchProducts,
        saleProducts,
        setSaleProducts,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
