/* eslint-disable react-hooks/exhaustive-deps */
import MenuIcon from '@mui/icons-material/Menu'
import { Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import Logo from '../../asset/images/logo.svg'
import theme from '../../theme'
import { THeader } from '../../types'
import DateTime from '../DateTime'

export default function Header({
  openModalSale,
  openModalSaleSpun,
  openModalReceiptMerchandise,
}: THeader) {
  const router = useRouter()

  const links = [
    {
      id: 1,
      title: 'Página Inícial',
      path: () => router.push('/home'),
    },
    {
      id: 2,
      title: 'Venda',
      path: () => openModalSale(true),
    },
    {
      id: 3,
      title: 'Venda Fiado',
      path: () => openModalSaleSpun(true),
    },
    {
      id: 4,
      title: 'Lista de Produtos',
      path: () => router.push('/list-products'),
    },
    {
      id: 5,
      title: 'Recebimento de Mercadorias',
      path: () => openModalReceiptMerchandise(true),
    },
  ]

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

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
      <Grid container justifyContent="center" alignItems="center">
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
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {links.map((page) => (
                <MenuItem key={page.id} onClick={page.path}>
                  <Typography sx={{ color: '#8a5c33' }} textAlign="center">
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <Image width={230} src={Logo} alt="Logo da Mariah da Roça" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {links.map((page) => (
              <Button
                key={page.id}
                onClick={page.path}
                sx={{
                  color: theme.brown,
                  display: 'block',
                  fontSize: '1rem',
                  fontWeight: '700',
                  mr: 2,
                  '&:hover': {
                    backgroundColor: theme.brown,
                    color: theme.gainsboro,
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Grid>
    </AppBar>
  )
}
