import React, { useContext } from 'react'
import ListaDeProdutos from '../components/PrintProducts'
import { DataContext } from '../providers/DataProvider'

export default function Print() {
  const { products } = useContext(DataContext)

  return <ListaDeProdutos produtos={products} />
}
