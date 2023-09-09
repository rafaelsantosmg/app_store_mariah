import { createContext, useState } from 'react'
import { DataContextT, providerProps } from '../types'

export const DataContext = createContext<DataContextT>({} as DataContextT)

export const DataProvider = ({ children }: providerProps) => {
  const [loading, setLoading] = useState(false)
  const [sales, setSales] = useState([])
  const [products, setProducts] = useState([])
  const [payments, setPayments] = useState([])

  return (
    <DataContext.Provider
      value={{
        loading,
        setLoading,
        sales,
        setSales,
        products,
        setProducts,
        payments,
        setPayments,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const UserConsumer = DataContext.Consumer
