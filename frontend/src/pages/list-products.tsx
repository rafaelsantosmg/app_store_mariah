import AddProduct from '@/components/AddProduct'
import ModalContent from '@/components/ModalContent'
import SaleScreen from '@/components/SaleScreen'
import SaleScreenSpun from '@/components/SaleScreenSpun'
import SearchBar from '@/components/SearchBar'
import theme from '@/theme'
import { Box, Button, Grid, Typography } from '@mui/material'
import { Fragment, useContext, useState } from 'react'
import Header from '../components/Header'
import ListProductsTable from '../components/ListProductsTable'
import { DataContext } from '../providers/DataProvider'
import { useRouter } from 'next/navigation'
import EntryProducts from '@/components/EntryProduct'

export default function ListProducts() {
  const router = useRouter()
  const {
    openModalReceiptMerchandise,
    openModalSale,
    openModalSaleSpun,
    setOpenModalReceiptMerchandise,
    setOpenModalSale,
    setOpenModalSaleSpun,
  } = useContext(DataContext)
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false)

  return (
    <Fragment>
      <Header
        openModalReceiptMerchandise={setOpenModalReceiptMerchandise}
        openModalSale={setOpenModalSale}
        openModalSaleSpun={setOpenModalSaleSpun}
      />
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={10}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  width: 'fit-content',
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
                onClick={() => router.push('/print-products')}
                sx={{
                  backgroundColor: theme.brown,
                  '&:hover': {
                    backgroundColor: theme.lightBrown,
                  },
                  color: theme.white,
                  displayPrint: 'none',
                  ml: 5,
                }}
              >
                Imprimir Lista
              </Button>
            </Box>
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
        open={openModalSale || openModalSaleSpun || openModalReceiptMerchandise}
        handleClose={() => {
          setOpenModalSale(false)
          setOpenModalSaleSpun(false)
          setOpenModalReceiptMerchandise(false)
        }}
      >
        {openModalSale && (
          <SaleScreen handleClose={() => setOpenModalSale(false)} />
        )}
        {openModalSaleSpun && (
          <SaleScreenSpun handleClose={() => setOpenModalSaleSpun(false)} />
        )}
        {openModalReceiptMerchandise && (
          <EntryProducts
            handleClose={() => setOpenModalReceiptMerchandise(false)}
          />
        )}
      </ModalContent>
    </Fragment>
  )
}
