import React, { useContext } from 'react'
import ListProductPrint from '../components/PrintProducts'
import { DataContext } from '../providers/DataProvider'

export default function Print() {
  const { products } = useContext(DataContext)

  const sortedProducts = products.sort((a, b) => {
    if (a.code < b.code) return -1
    if (a.code > b.code) return 1
    return 0
  })

  return <ListProductPrint products={sortedProducts} />
}
