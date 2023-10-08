import ModalContent from '@/components/ModalContent'
import SaleScreen from '@/components/SaleScreen'
import SearchBar from '@/components/SearchBar'
import { Button, Grid, MenuItem, Typography } from '@mui/material'
import { Fragment, useContext, useState } from 'react'
import Header from '../components/Header'
import ListProductsTable from '../components/ListProductsTable'
import { DataContext } from '../providers/DataProvider'
import theme from '@/theme'
import AddProduct from '@/components/AddProduct'

export default function ListProducts() {
  const { openModalSale, setOpenModalSale } = useContext(DataContext)
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false)

  return (
    <Fragment>
      <Header openModal={setOpenModalSale} />
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={10}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography
              variant="h2"
              sx={{
                color: theme.brown,
                '@media (max-width: 600px)': {
                  fontSize: '1.2rem',
                },
                mb: 1,
              }}
            >
              Lista de Produtos
            </Typography>
            <Button
              variant="outlined"
              type="button"
              sx={{
                color: theme.white,
                backgroundColor: theme.brown,
                '&:hover': {
                  backgroundColor: theme.lightBrown,
                },
              }}
              onClick={() => setOpenAddProduct(true)}
            >
              Cadastrar Produto
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <SearchBar />
        </Grid>
        <Grid item xs={10} sx={{ mt: 2 }}>
          <ListProductsTable />
        </Grid>
      </Grid>
      <ModalContent
        open={openAddProduct}
        handleClose={() => setOpenAddProduct(false)}
      >
        <AddProduct setOpenAddProduct={setOpenAddProduct} />
      </ModalContent>
      <ModalContent
        open={openModalSale}
        handleClose={() => setOpenModalSale(false)}
      >
        <SaleScreen handleClose={() => setOpenModalSale(false)} />
      </ModalContent>
    </Fragment>
  )
}
