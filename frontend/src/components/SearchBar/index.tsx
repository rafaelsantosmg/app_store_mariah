/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from '@mui/material'
import { ChangeEvent, useContext } from 'react'
import { Product } from '../../interfaces/Products'
import { DataContext } from '../../providers/DataProvider'
import theme from '../../theme'
import TextFields from '../Inputs/TextFields'

export default function SearchBar(): JSX.Element {
  const { products, setSearchProducts } = useContext(DataContext)

  const handleChangeTextFields = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const search = target.value
    if (!search) {
      setSearchProducts([])
      return
    }
    const filteredProducts = products.filter((product: Product) => {
      if (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.price.toFixed(2).replace('.', ',').includes(search)
      ) {
        return product
      }
    })

    setSearchProducts(filteredProducts)
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center" xs={12}>
      <Box
        sx={{
          background: theme.white,
          display: 'flex',
          width: '100%',
        }}
      >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12}>
            <TextFields
              label="Busque um produto"
              onChange={handleChangeTextFields}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
