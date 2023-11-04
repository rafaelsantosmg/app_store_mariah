import SideNavBar from '@/components/SideNavBar'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DataProvider } from '../providers/DataProvider'
import '../styles/globals.css'
import myTheme from '../theme'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: myTheme.gainsboro, // Cor de fundo da track da barra de rolagem
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: myTheme.lightBrown, // Cor do thumb (o "botão" da barra de rolagem)
          borderRadius: '6px',
        },
      },
    },
  },
  typography: {
    subtitle1: {
      fontFamily: ['Gagalin', 'sans-serif'].join(', '),
      fontSize: 12,
    },
    h1: {
      fontFamily: ['Gagalin', 'sans-serif'].join(', '),
      fontSize: 48,
    },
    h2: {
      fontFamily: ['Gagalin', 'sans-serif'].join(', '),
      fontSize: 40,
    },
    h3: {
      fontFamily: ['Gagalin', 'sans-serif'].join(', '),
      fontSize: 32,
    },
    h4: {
      fontFamily: ['Gagalin', 'sans-serif'].join(', '),
      fontSize: 24,
    },
    body1: {
      fontFamily: ['Roboto', 'sans-serif'].join(', '),
      fontWeight: 400,
    },
    button: {
      fontFamily: ['Gagalin', 'sans-serif'].join(', '),
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: 2.5,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Head>
        <title>Mariah da Roça</title>
        <meta
          name="description"
          content="Mariah da Roça é uma loja de artigos religiosos em geral."
        />
        <link href="https://fonts.cdnfonts.com/css/gagalin" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SideNavBar>
          <Component {...pageProps} />
        </SideNavBar>
        <ToastContainer />
      </ThemeProvider>
    </DataProvider>
  )
}

export default MyApp
