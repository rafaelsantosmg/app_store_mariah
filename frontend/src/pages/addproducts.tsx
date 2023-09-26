import { Box } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import * as Yup from 'yup'
import Form from '../components/Form'
import Header from '../components/Header'
import { DataContext } from '../providers/DataProvider'
import api from '../services'
import { TFormValues } from '../types'

export default function AddProducts(): JSX.Element {
  const router = useRouter()
  const { products, setProducts, setLoading } = useContext(DataContext)

  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    description: Yup.string().required('Campo obrigatório'),
    stock: Yup.number()
      .min(0, 'O valor mínimo para estoque é 1')
      .required('Campo obrigatório')
      .nullable(),
    price: Yup.number()
      .typeError('O valor deve ser um número')
      .min(0, 'O valor não pode ser menor que 0')
      .required('Campo obrigatório'),
    image: Yup.string().optional(),
  })

  const handleSubmit = async (values: TFormValues) => {
    try {
      setLoading(true)
      const request: TFormValues = {
        name: values.name,
        description: values.description,
        stock: Number(values.stock),
        price: Number(values.price),
        image: values.image,
      }
      const product: any = await api.post('/products', request)
      setProducts([...products, product])
      router.push('/home')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const form = useFormik({
    initialValues: {
      name: '',
      description: '',
      stock: 0,
      price: 0,
      image: '',
    },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await handleSubmit(values)
      form.resetForm()
    },
  })

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: 1,
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"header header header header" 
        "form form form form"`,
      }}
    >
      <Header />
      <Form form={form} />
    </Box>
  )
}
