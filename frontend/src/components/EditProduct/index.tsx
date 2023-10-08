/* eslint-disable react-hooks/exhaustive-deps */
import { DataContext } from '@/providers/DataProvider'
import api from '@/services'
import { TFormValues } from '@/types'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import ProductForm from '../ProductForm'

export default function EditProduct({ ...props }): JSX.Element {
  const { product, setProduct } = props
  const router = useRouter()
  const { form, products, setLoading, setProducts } = useContext(DataContext)

  // const schema = Yup.object().shape({
  //   name: Yup.string().required('Campo obrigatório'),
  //   description: Yup.string().optional(),
  //   stock: Yup.number()
  //     .min(0, 'O valor mínimo para estoque é 1')
  //     .required('Campo obrigatório')
  //     .nullable(),
  //   costPrice: Yup.number()
  //     .typeError('O valor deve ser um número')
  //     .min(0, 'O valor mínimo para preço de custo é 1')
  //     .required('Campo obrigatório'),
  //   percentage: Yup.number()
  //     .typeError('O valor deve ser um número')
  //     .min(0, 'O valor mínimo para porcentagem de lucro é 1')
  //     .max(100, 'O valor máximo para porcentagem de lucro é 100')
  //     .optional(),
  //   salePrice: Yup.number()
  //     .typeError('O valor deve ser um número')
  //     .min(0, 'O valor não pode ser menor que 0')
  //     .required('Campo obrigatório'),
  //   image: Yup.string().optional(),
  // })

  const handleSubmit = async (values: TFormValues) => {
    try {
      setLoading(true)
      const request: TFormValues = {
        name: values.name.toUpperCase().trim(),
        description: values.description.toUpperCase().trim(),
        stock: Number(values.stock),
        costPrice: Number(values.costPrice),
        salePrice: Number(values.salePrice),
        image: values.image,
      }
      const newProducts = products
      const { data } = await api.patch(`/products/${product.id}`, request)
      const index = products.findIndex((p) => p.id === data.id)
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
      name: product.name,
      description: product.description,
      stock: product.stock,
      costPrice: product.costPrice,
      percentage:
        ((product.salePrice - product.costPrice) / product.costPrice) * 100,
      salePrice: product.salePrice,
      image: product?.image || '',
    },
    // validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await handleSubmit(values)
      form.resetForm()
    },
  })

  useEffect(() => {
    const { values, setFieldValue } = formEditProducts
    const salePrice =
      Number(values.costPrice) +
      Number(values.costPrice) * (Number(values.percentage) / 100)
    setFieldValue('salePrice', salePrice)
  }, [formEditProducts.values.percentage])

  return (
    <ProductForm form={formEditProducts} type="edit" setProduct={setProduct} />
  )
}
