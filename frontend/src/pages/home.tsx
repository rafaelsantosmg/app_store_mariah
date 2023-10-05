/* eslint-disable react-hooks/exhaustive-deps */
import ModalSale from '@/components/ModalSale'
import { Product } from '@/interfaces/Products'
import { Box, Button, Grid } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import Sale from '../components/Sale'
import { DataContext } from '../providers/DataProvider'
import api from '../services'

export default function Home(): JSX.Element {
  const route = useRouter()
  const {
    setProducts,
    setLoading,
    products,
    setSearchProducts,
    openModalSale,
    setOpenModalSale,
  } = useContext(DataContext)

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
        setOpenModalSale(false)
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
    <>
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
        <ModalSale
          open={openModalSale}
          handleClose={() => setOpenModalSale(false)}
        >
          <Sale form={form} handleClose={() => setOpenModalSale(false)} />
        </ModalSale>
      </Box>
    </>
  )
}
