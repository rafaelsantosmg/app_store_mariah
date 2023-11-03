/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'
import Logo from '../asset/images/logo.svg'
import Slogan from '../asset/images/slogan.svg'

export default function Home(): JSX.Element {
  return (
    <Fragment>
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
    </Fragment>
  )
}
