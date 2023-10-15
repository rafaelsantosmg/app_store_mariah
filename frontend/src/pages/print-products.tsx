import React, { useContext } from 'react'
import ListProductPrint from '../components/PrintProducts'
import { DataContext } from '../providers/DataProvider'

export default function Print() {
  const { products } = useContext(DataContext)

  return <ListProductPrint products={products} />
}
