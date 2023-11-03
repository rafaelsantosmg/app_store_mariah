/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../asset/images/logo.svg'
import theme from '../../theme'
import DateTime from '../DateTime'

export default function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.gainsboro,
        '& .MuiToolbar-root': {
          minHeight: 0,
        },
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: '100%',
            justifyContent: 'space-between',
            borderBottom: '1px solid #8a5c33',
          }}
        >
          <Link href="/home">
            <Image width={230} src={Logo} alt="Logo da Mariah da Roça" />
          </Link>
          <DateTime />
        </Box>
      </Grid>
    </AppBar>
  )
}
