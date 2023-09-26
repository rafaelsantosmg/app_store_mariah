import { Order } from '../types'
import { Product } from './Products'

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => void
  order: Order
  orderBy: string
  rowCount: number
}

export interface HeadCell {
  disablePadding: boolean
  id: keyof Product
  label: string
  numeric: boolean
}
