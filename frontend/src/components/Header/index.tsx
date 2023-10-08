import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import { THeader } from '../../types'
import theme from '../../theme'
import Image from 'next/image'
import Logo from '../../asset/images/logo.svg'
import { time } from 'console'
import Link from 'next/link'
import { DataContext } from '@/providers/DataProvider'
import { Grid } from '@mui/material'

export default function Header({ openModal }: THeader) {
  const { dateTime } = useContext(DataContext)
  const router = useRouter()

  const links = [
    {
      id: 1,
      title: 'Página Inícial',
      path: () => router.push('/home'),
    },
    {
      id: 2,
      title: 'Realizar Venda',
      path: () => openModal(true),
    },
    {
      id: 3,
      title: 'Lista de Produtos',
      path: () => router.push('/list-products'),
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
    <AppBar position="static" sx={{ backgroundColor: theme.gainsboro }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Box
          sx={{
            ml: 1,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Link href="/home">
            <Image width={230} src={Logo} alt="Logo da Mariah da Roça" />
          </Link>
        </Box>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
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
                  color: '#592e01',
                  display: 'block',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  mr: 2,
                  '&:hover': {
                    borderBottom: '2px solid #8a5c33',
                  },
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
        <hr
          style={{
            width: '0.2rem',
            height: '3rem',
            backgroundColor: '#592e01',
            border: 'none',
            margin: '0',
            padding: '0',
          }}
        />
        <Typography
          variant="h3"
          sx={{
            color: theme.brown,
            '@media (max-width: 600px)': {
              fontSize: '1.2rem',
            },
            mr: 2,
          }}
        >
          {dateTime}
        </Typography>
      </Grid>
    </AppBar>
  )
}
