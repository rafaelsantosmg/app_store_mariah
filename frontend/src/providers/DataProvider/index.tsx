import { createContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Product, ProductSale } from '../../interfaces/Products'
import { TDataContext, TProviderProps } from '../../types'
import api from '@/services'

function serializePaymentMethods(paymentMethod: string): string {
  switch (paymentMethod) {
    case 'Dinheiro':
      return 'money'
    case 'Pix':
      return 'pix'
    case 'Cartão de Crédito':
      return 'credit_card'
    case 'Cartão de Débito':
      return 'debit_card'
    default:
      return ''
  }
}

export const DataContext = createContext<TDataContext>({} as TDataContext)

export const DataProvider = ({ children }: TProviderProps) => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchProducts, setSearchProducts] = useState<Product[]>([])
  const [saleProducts, setSaleProducts] = useState<ProductSale[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openModalSale, setOpenModalSale] = useState(false)
  const [getProducts, setGetProducts] = useState<boolean>(false)

  useEffect(() => {
    const getProductsApi = async () => {
      try {
        const { data } = await api.get('/products')
        setProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    getProductsApi()
  }, [getProducts])

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
      paymentInstallments: '',
      quantity: 0,
      discont: 0,
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values, { setSubmitting }) => {
      const request = {
        discount: values.discont,
        paymentInstallments: values.paymentInstallments,
        paymentMethod: serializePaymentMethods(values.paymentMethod),
        products: values.products,
      }
      try {
        await api.post('/sales', request)
        form.resetForm()
        setOpenModalSale(false)
      } catch (error) {
        console.log(error)
      } finally {
        setSubmitting(false)
        setGetProducts(!getProducts)
      }
    },
  })

  return (
    <DataContext.Provider
      value={{
        openModalSale,
        setOpenModalSale,
        products,
        setProducts,
        searchProducts,
        setSearchProducts,
        saleProducts,
        setSaleProducts,
        loading,
        setLoading,
        form,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
