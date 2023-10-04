/* eslint-disable react-hooks/exhaustive-deps */
import ModalSale from '@/components/ModalSale'
import { Box, Button, Grid } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import Header from '../components/Header'
import Sale from '../components/Sale'
import { DataContext } from '../providers/DataProvider'
import api from '../services'

export default function Home(): JSX.Element {
  const route = useRouter()
  const { setProducts, setLoading } = useContext(DataContext)
  const [sale, setSale] = useState(false)

  const schema = Yup.object().shape({
    products: Yup.array().of(
      Yup.object().shape({
        id: Yup.number().required(),
        quantity: Yup.number().required(),
      })
    ),
    paymentMethod: Yup.string().required(),
  })

  const form = useFormik({
    initialValues: {
      products: [],
      paymentMethod: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await api.post('/sales', values)
        resetForm()
        setSale(false)
      } catch (error) {
        console.log(error)
      }
    },
  })

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true)
        const { data } = await api.get('/products')
        setProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [])

  return (
    <Box
      sx={{
        alingItems: 'center',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 1,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"header header header header"
        "button button button button"`,
      }}
    >
      <Header />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          gridArea: 'button',
          justifyContent: 'center',
          mt: 2,
          mb: 2,
          width: '100%',
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          md={8}
          sm={10}
          xs={10}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={() => setSale(true)}
          >
            Fazer uma venda
          </Button>
        </Grid>
        <Grid item sx={{ m: 2 }}>
          <Button
            variant="contained"
            color="success"
            sx={{ mr: 2 }}
            onClick={() => route.push('/addproducts')}
          >
            Cadastrar novo produto
          </Button>
        </Grid>
      </Box>
      <ModalSale open={sale} handleClose={() => setSale(false)}>
        <Sale form={form} handleClose={() => setSale(false)} />
      </ModalSale>
    </Box>
  )
}
