import api from '@/services'
import { useFormik } from 'formik'
import { createContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Product, ProductSale } from '../../interfaces/Products'
import { TDataContext, TProviderProps, TSaleProduct } from '../../types'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const today = new Date()

const dateTime = format(today, "'Dia' dd 'de' MMMM'", {
  locale: ptBR,
})

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
        toast.error('Erro ao buscar produtos \n' + error)
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
          quantity: Yup.string().required(),
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
      const productsSerialize = values.products.map(
        (product: TSaleProduct) => ({
          productId: product.productId,
          quantity:
            product.stockType === 'UN'
              ? Number(product.quantity)
              : Number(product.quantity.split(',').join('.')) * 1000,
          stockType: product.stockType,
        })
      )
      const request = {
        discount: values.discont,
        paymentInstallments: values.paymentInstallments,
        paymentMethod: serializePaymentMethods(values.paymentMethod),
        products: productsSerialize,
      }
      try {
        await api.post('/sales', request)
        form.resetForm()
        setOpenModalSale(false)
      } catch (error) {
        toast.error('Erro ao cadastrar venda \n' + error)
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
        dateTime,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
