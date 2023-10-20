/* eslint-disable react-hooks/exhaustive-deps */
import { DataContext } from '@/providers/DataProvider'
import api from '@/services'
import { TFormValues } from '@/types'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import * as Yup from 'yup'
import ProductForm from '../ProductForm'

export default function EditProduct({ ...props }): JSX.Element {
  const { product, setProduct } = props
  const router = useRouter()
  const { form, products, setLoading, setProducts } = useContext(DataContext)

  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    stockType: Yup.string().required('Campo obrigatório'),
    stock: Yup.string().required('Campo obrigatório').nullable(),
    costPrice: Yup.number()
      .typeError('O valor deve ser um número')
      .min(0, 'O valor mínimo para preço de custo é 0')
      .required('Campo obrigatório'),
    percentage: Yup.number().typeError('O valor deve ser um número').optional(),
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
        stockType: values.stockType === 'UNIDADE' ? 'UN' : 'KG',
        stock: Number(stock),
        costPrice: Number(values.costPrice),
        salePrice: Number(values.salePrice),
        image: values.image,
      }
      const newProducts = products
      const { data } = await api.patch(`/products/${product.id}`, request)
      const index = products.findIndex((p) => p.code === data.code)
      if (index < 0) {
        throw new Error('Produto não encontrado')
      }
      newProducts[index] = data
      setProducts([...newProducts])
      router.push('/list-products')
    } catch (error) {
      alert('Erro ao editar produto \n' + error)
    } finally {
      setLoading(false)
      setProduct({})
    }
  }

  const formEditProducts = useFormik({
    initialValues: {
      id: product.id,
      code: product.code,
      name: product.name,
      stockType: product.stockType === 'UN' ? 'UNIDADE' : 'QUILOGRAMA',
      stock: product.stock,
      costPrice: product.costPrice,
      percentage: 0,
      salePrice: product.salePrice,
      image: product?.image || '',
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
    <ProductForm form={formEditProducts} type="edit" setProduct={setProduct} />
  )
}
