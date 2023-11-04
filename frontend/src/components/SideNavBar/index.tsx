import Logo from '@/asset/images/logo.svg'
import { DataContext } from '@/providers/DataProvider'
import theme from '@/theme'
import {
  AddHomeWork,
  AttachMoney,
  Inventory,
  ListAlt,
  MonetizationOn,
} from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { Grid, Toolbar } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import DateTime from '../DateTime'
import ModalContent from '../ModalContent'
import SaleScreen from '../SaleScreen'
import SaleScreenSpun from '../SaleScreenSpun'
import EntryProducts from '../EntryProduct'

const drawerWidth = 300

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

export default function SideNavBar({ ...props }) {
  const { children } = props
  const {
    openModalReceiptMerchandise,
    openModalSale,
    openModalSaleSpun,
    setOpenModalReceiptMerchandise,
    setOpenModalSale,
    setOpenModalSaleSpun,
  } = useContext(DataContext)
  const router = useRouter()
  const themeMUI = useTheme()
  const [open, setOpen] = useState(false)

  const links = [
    {
      id: 1,
      title: 'Página Inícial',
      handleClick: () => router.push('/home'),
      icon: <AddHomeWork />,
    },
    {
      id: 2,
      title: 'Venda',
      handleClick: () => setOpenModalSale(true),
      icon: <MonetizationOn />,
    },
    {
      id: 3,
      title: 'Venda Fiado',
      handleClick: () => setOpenModalSaleSpun(true),
      icon: <AttachMoney />,
    },
    {
      id: 4,
      title: 'Lista de Produtos',
      handleClick: () => router.push('/list-products'),
      icon: <Inventory />,
    },
    {
      id: 5,
      title: 'Recebimento de Mercadorias',
      handleClick: () => setOpenModalReceiptMerchandise(true),
      icon: <ListAlt />,
    },
  ]

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: theme.gainsboro,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
              color: theme.brown,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent="center" alignItems="center">
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Link href="/home">
                <Image width={230} src={Logo} alt="Logo da Mariah da Roça" />
              </Link>
              <DateTime />
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: theme.gainsboro,
            '& .MuiDivider-root': {
              backgroundColor: theme.brown,
            },
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {themeMUI.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map(({ id, title, icon, handleClick }) => (
            <ListItem key={id} disablePadding sx={{ display: 'block' }}>
              <Tooltip title={title}>
                <ListItemButton
                  sx={{
                    justifyContent: open ? 'initial' : 'center',
                    minHeight: 48,
                    px: 2.5,
                  }}
                  onClick={handleClick}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.brown,
                      justifyContent: 'center',
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={title}
                    sx={{
                      color: theme.lightBrown,
                      fontWeight: 600,
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, pl: 8, pr: 8 }}>
        <DrawerHeader />
        {children}

        <ModalContent
          open={
            openModalSale || openModalSaleSpun || openModalReceiptMerchandise
          }
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
          {openModalReceiptMerchandise && <EntryProducts />}
        </ModalContent>
      </Box>
    </Box>
  )
}
