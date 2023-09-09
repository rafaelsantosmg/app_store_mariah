/* eslint-disable @typescript-eslint/no-explicit-any */
export type providerProps = {
  children: React.ReactNode
}

export type DataContextT = {
  loading: boolean
  setLoading: (loading: boolean) => void
  sales: any
  setSales: (sales: any) => void
  products: any
  setProducts: (products: any) => void
  payments: any
  setPayments: (payments: any) => void
}