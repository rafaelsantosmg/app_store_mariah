/* eslint-disable react-hooks/exhaustive-deps */
import ModalSale from '@/components/ModalSale'
import { Product } from '@/interfaces/Products'
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
  const { setProducts, setLoading, products, setSearchProducts } =
    useContext(DataContext)
  const [sale, setSale] = useState(false)

  const schema = Yup.object().shape({
    id: Yup.string().optional(),
    search: Yup.string().optional(),
    products: Yup.array()
      .of(
        Yup.object().shape({
          productId: Yup.number().required(),
          quantity: Yup.number().required(),
        })
      )
      .required('Selecione pelo menos um produto'),
    paymentMethod: Yup.string().required('Selecione uma forma de pagamento'),
    quantity: Yup.number().optional(),
    discont: Yup.number()
      .min(0)
      .max(10, 'O desconto máximo é de 10%')
      .optional(),
  })

  const form = useFormik({
    initialValues: {
      id: '',
      search: '',
      products: [],
      paymentMethod: '',
      quantity: 0,
      discont: 0,
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await api.post('/sales', values)
        form.resetForm()
        setSale(false)
      } catch (error) {
        console.log(error)
      } finally {
        setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    const filteredProducts = products.filter(
      (product: Product) =>
        (form.values.search !== '' &&
          product.name
            .toLowerCase()
            .includes(form.values.search.toLowerCase())) ||
        product.id === Number(form.values.id)
    )

    setSearchProducts(filteredProducts)
  }, [form.values.id, form.values.search])

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

  useEffect(() => {
    console.log(form.errors, form.touched)
  }, [form.errors, form.touched])

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
