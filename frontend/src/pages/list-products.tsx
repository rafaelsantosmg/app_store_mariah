import React, { useContext } from 'react'
import Header from '../components/Header'
import { DataContext } from '../providers/DataProvider'

export default function ListProducts() {
  const { setOpenModalSale } = useContext(DataContext)
  return (
    <>
      <Header openModal={setOpenModalSale} />
    </>
  )
}
