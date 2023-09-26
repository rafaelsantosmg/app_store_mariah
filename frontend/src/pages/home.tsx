/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import SortTable from '../components/Table'
import SearchBar from '../components/SearchBar'
import { DataContext } from '../providers/DataProvider'
import api from '../services'

export default function Home(): JSX.Element {
  const { setProducts, setSearchProducts, setLoading } = useContext(DataContext)

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/products')
        setProducts(data)
        setSearchProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  return (
    <Box
      sx={{
        alingItems: 'center',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 1,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"header header header header" 
        "search search search search" "table table table table"`,
      }}
    >
      <Header />
      <SearchBar />
      <SortTable />
    </Box>
  )
}
