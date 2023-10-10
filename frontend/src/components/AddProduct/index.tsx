/* eslint-disable react-hooks/exhaustive-deps */
import ProductForm from '@/components/ProductForm'
import { Product } from '@/interfaces/Products'
import { DataContext } from '@/providers/DataProvider'
import api from '@/services'
import { TFormValues } from '@/types'
import { useFormik } from 'formik'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function AddProduct({ ...props }): JSX.Element {
  const { form, products, setLoading, setProducts } = useContext(DataContext)
  const { setOpenAddProduct } = props

  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    description: Yup.string().optional(),
    stockType: Yup.string().required('Campo obrigatório'),
    stock: Yup.string().required('Campo obrigatório').nullable(),
    costPrice: Yup.number()
      .typeError('O valor deve ser um número')
      .min(0, 'O valor mínimo para preço de custo é 0')
      .required('Campo obrigatório'),
    percentage: Yup.number()
      .typeError('O valor deve ser um número')
      .min(0, 'O valor mínimo para porcentagem de lucro é 0')
      .optional(),
    salePrice: Yup.number()
      .typeError('O valor deve ser um número')
      .min(0, 'O valor não pode ser menor que 0')
      .required('Campo obrigatório'),
    image: Yup.string().optional(),
  })

  const handleSubmit = async (values: TFormValues) => {
    try {
      setLoading(true)
      const stock =
        typeof values.stock === 'number'
          ? values.stock
          : values.stock.split(',').join('.')
      const request: TFormValues = {
        name: values.name.toUpperCase().trim(),
        description: values.description.toUpperCase().trim(),
        stockType: values.stockType === 'UNIDADE' ? 'UN' : 'KG',
        stock: Number(stock),
        costPrice: Number(values.costPrice),
        salePrice: Number(values.salePrice),
        image: values.image,
      }
      const { data } = await api.post('/products', request)
      const newProducts: Product[] = await api.get('/products')
      setProducts(newProducts)
      // setProducts([...products, data])
      toast.success(`Produto ${data.name} cadastrado com sucesso!`)
    } catch (error) {
      toast.error('Erro ao cadastrar produto \n' + error)
    } finally {
      setLoading(false)
      setOpenAddProduct(false)
    }
  }

  const formCadProducts = useFormik({
    initialValues: {
      name: '',
      description: '',
      stockType: 'UNIDADE',
      stock: '',
      costPrice: 0,
      percentage: 0,
      salePrice: 0,
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

  useEffect(() => {
    const { values, setFieldValue } = formCadProducts
    const salePrice =
      Number(values.costPrice) +
      Number(values.costPrice) * (Number(values.percentage) / 100)
    setFieldValue('salePrice', salePrice)
  }, [formCadProducts.values.percentage])

  return (
    <ProductForm
      form={formCadProducts}
      setOpenAddProduct={setOpenAddProduct}
      type="cad"
    />
  )
}
