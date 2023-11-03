/* eslint-disable react-hooks/exhaustive-deps */
import ModalContent from '@/components/ModalContent'
import SaleScreenSpun from '@/components/SaleScreenSpun'
import { Box } from '@mui/material'
import Image from 'next/image'
import { Fragment, useContext } from 'react'
import Logo from '../asset/images/logo.svg'
import Slogan from '../asset/images/slogan.svg'
import Header from '../components/Header'
import SaleScreen from '../components/SaleScreen'
import { DataContext } from '../providers/DataProvider'
import EntryProduct from '@/components/EntryProduct'
import SideNavBar from '@/components/SideNavBar'

export default function Home(): JSX.Element {
  const {
    openModalReceiptMerchandise,
    openModalSale,
    openModalSaleSpun,
    setOpenModalReceiptMerchandise,
    setOpenModalSale,
    setOpenModalSaleSpun,
  } = useContext(DataContext)

  return (
    <Fragment>
      <SideNavBar
        openModalReceiptMerchandise={setOpenModalReceiptMerchandise}
        openModalSale={setOpenModalSale}
        openModalSaleSpun={setOpenModalSaleSpun}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            height: '80vh',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Image width={700} src={Logo} alt="Logo da Mariah da Roça" />
          <Image width={400} src={Slogan} alt="Slogan da Mariah da Roça" />
        </Box>
      </SideNavBar>
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
        {openModalReceiptMerchandise && <EntryProduct />}
      </ModalContent>
    </Fragment>
  )
}
