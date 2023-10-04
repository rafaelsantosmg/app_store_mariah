import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { client } from '../lib/client'
import { DataProvider } from '../providers/DataProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </ApolloProvider>
  )
}

export default MyApp
