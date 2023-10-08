/* eslint-disable react-hooks/exhaustive-deps */
import ModalContent from '@/components/ModalContent'
import { Box } from '@mui/material'
import Image from 'next/image'
import { Fragment, useContext } from 'react'
import Logo from '../asset/images/logo.svg'
import Slogan from '../asset/images/slogan.svg'
import Header from '../components/Header'
import SaleScreen from '../components/SaleScreen'
import { DataContext } from '../providers/DataProvider'

export default function Home(): JSX.Element {
  const { openModalSale, setOpenModalSale } = useContext(DataContext)

  return (
    <Fragment>
      <Header openModal={setOpenModalSale} />
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
      <ModalContent
        open={openModalSale}
        handleClose={() => setOpenModalSale(false)}
      >
        <SaleScreen handleClose={() => setOpenModalSale(false)} />
      </ModalContent>
    </Fragment>
  )
}
