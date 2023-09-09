
import React from 'react'
import { Routes } from './routes'
import { DataProvider } from './provider'

const App: React.FC = (): JSX.Element => {

  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  )
}

export default App
