import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DataProvider } from '../providers/DataProvider'
import '../styles/globals.css'

const theme = createTheme({
  typography: {
    fontFamily: ['Gagalin', 'sans-serif'].join(', '),
    allVariants: {
      letterSpacing: '0.1em',
      textTransform: 'none',
    },
    fontSize: 15,
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
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </DataProvider>
  )
}

export default MyApp
