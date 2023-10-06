import ModalContent from '@/components/ModalContent'
import SaleScreen from '@/components/SaleScreen'
import SearchBar from '@/components/SearchBar'
import { Grid } from '@mui/material'
import { useContext } from 'react'
import Header from '../components/Header'
import ListProductsTable from '../components/ListProductsTable'
import { DataContext } from '../providers/DataProvider'

export default function ListProducts() {
  const { openModalSale, setOpenModalSale } = useContext(DataContext)
  return (
    <>
      <Header openModal={setOpenModalSale} />
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={10}>
          <SearchBar />
        </Grid>
        <Grid item xs={10} sx={{ mt: 2 }}>
          <ListProductsTable />
        </Grid>
      </Grid>
      <ModalContent
        open={openModalSale}
        handleClose={() => setOpenModalSale(false)}
      >
        <SaleScreen handleClose={() => setOpenModalSale(false)} />
      </ModalContent>
    </>
  )
}
