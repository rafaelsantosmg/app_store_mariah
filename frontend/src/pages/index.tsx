import { useContext } from 'react'
import Header from '../components/Header'
import Home from './home'
import { DataContext } from '../providers/DataProvider'

export default function App(): JSX.Element {
  const { setOpenModalSale } = useContext(DataContext)
  return (
    <>
      <Header openModal={setOpenModalSale} />
      <Home />
    </>
  )
}
