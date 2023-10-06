import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { client } from '../lib/client'
import { DataProvider } from '../providers/DataProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </DataProvider>
    </ApolloProvider>
  )
}

export default MyApp
