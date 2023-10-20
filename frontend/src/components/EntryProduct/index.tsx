/* eslint-disable react-hooks/exhaustive-deps */
import { DataContext } from '@/providers/DataProvider'
import api from '@/services'
import theme from '@/theme'
import { TFormValues } from '@/types'
import { filterListProducts } from '@/utils/filterProducts'
import {
  formateValueInputNumeric,
  formateValueInputNumericPrice,
} from '@/utils/formate-values'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import SelectFields from '../Inputs/SelectFields'
import TextFields from '../Inputs/TextFields'
import ProductsTable from '../ProductsTable'
import SearchBar from '../SearchBar'

const style = {
  p: {
    color: theme.red,
    ml: 1,
  },
}

const stockTypes = ['UNIDADE', 'QUILOGRAMA']

export default function EntryProducts({ ...props }): JSX.Element {
  const { form, products, setLoading, setProducts } = useContext(DataContext)
  const { handleClose } = props
  const router = useRouter()
  const [viewTable, setViewTable] = useState<boolean>(false)

  const schema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    description: Yup.string().optional(),
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

  const handleSubmitForm = async (values: TFormValues) => {
    try {
      setLoading(true)
      const request: TFormValues = {
        name: values.name.toUpperCase().trim(),
        stockType: values.stockType === 'UNIDADE' ? 'UN' : 'KG',
        stock: Number(values.pastStock) + Number(values.stock),
        costPrice: Number(values.costPrice),
        salePrice: Number(values.salePrice),
        image: values.image,
      }
      const newProducts = products
      const { data } = await api.patch(`/products/${values.id}`, request)
      const index = products.findIndex((p) => p.code === data.code)
      if (index < 0) {
        throw new Error('Produto não encontrado')
      }
      newProducts[index] = data
      setProducts([...newProducts])
    } catch (error) {
      alert('Erro ao editar produto \n' + error)
    } finally {
      setLoading(false)
      setViewTable(false)
    }
  }

  const formEditProducts = useFormik({
    initialValues: {
      id: 0,
      code: '',
      name: '',
      costPrice: 0,
      salePrice: 0,
      stockType: 'UN',
      stock: 0,
      pastStock: 0,
    },
    validationSchema: schema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      await handleSubmitForm(values)
      form.resetForm()
    },
  })

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    touched,
    values,
  } = formEditProducts

  useEffect(() => {
    const findProduct = products.find((p) => p.code === form.values.searchCode)
    if (findProduct?.id) {
      setFieldValue('id', findProduct.id)
      setFieldValue('code', findProduct.code)
      setFieldValue('name', findProduct.name)
      setFieldValue('costPrice', findProduct.costPrice)
      setFieldValue('salePrice', findProduct.salePrice)
      setFieldValue('stockType', findProduct.stockType)
      setFieldValue('pastStock', findProduct.stock)
      setViewTable(false)
    } else {
      resetForm()
      const listProducts = filterListProducts(
        products,
        form.values.searchCode,
        form.values.searchName
      )
      if (
        listProducts.length !== 0 &&
        (form.values.searchCode !== '' || form.values.searchName !== '')
      ) {
        setViewTable(true)
      } else {
        setViewTable(false)
      }
    }
  }, [form.values.searchCode, form.values.searchName])

  const handleSelectProduct = (product: any) => {
    setFieldValue('id', product.id)
    setFieldValue('code', product.code)
    setFieldValue('name', product.name)
    setFieldValue('costPrice', product.costPrice)
    setFieldValue('salePrice', product.salePrice)
    setFieldValue('stockType', product.stockType)
    setFieldValue('pastStock', product.stock)
  }

  const handleChangeStock = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = formateValueInputNumeric(event.target.value)
    setFieldValue(event.target.name, inputQuantity)
  }

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = formateValueInputNumericPrice(event.target.value)
    setFieldValue(event.target.name, inputQuantity)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem 0',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '1rem',
          width: '100%',
        }}
      >
        <Grid
          container
          rowGap={3}
          justifyContent="center"
          sx={{ width: '90%' }}
        >
          <SearchBar />
          {viewTable ? (
            <ProductsTable
              handleClickProducts={{
                handleSelectProduct,
                setViewTable,
              }}
            />
          ) : (
            <>
              <Grid container justifyContent="space-between">
                <Typography
                  variant="h3"
                  sx={{
                    color: theme.brown,
                    '@media (max-width: 600px)': {
                      fontSize: '1rem',
                    },
                  }}
                >
                  Entrada de Mercadorias
                </Typography>

                <Grid item xs={2}>
                  <TextFields label="Código" value={values.code} disabled />
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={12}>
                  <TextFields
                    label="Nome"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && touched.name && (
                    <Typography sx={style.p}>{errors.name}</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={5}>
                  <SelectFields
                    label="Tipo de Dado"
                    name="stockType"
                    onChange={handleChange}
                    options={stockTypes}
                    value={values.stockType}
                    clearField={() => form.setFieldValue('stockType', '')}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextFields
                    label="Estoque"
                    name="stock"
                    onBlur={handleBlur}
                    onChange={handleChangeStock}
                    value={values.stock}
                  />
                  {errors.stock && touched.stock && (
                    <Typography sx={style.p}>{errors.stock}</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item xs={5}>
                  <TextFields
                    inputProps={{ min: 0 }}
                    label="Preço de Custo"
                    name="costPrice"
                    onBlur={handleBlur}
                    onChange={handleChangePrice}
                    value={values.costPrice}
                  />
                  {errors.costPrice && touched.costPrice && (
                    <Typography sx={style.p}>{errors.costPrice}</Typography>
                  )}
                </Grid>
                <Grid item xs={5}>
                  <TextFields
                    label="Preço de Venda"
                    name="salePrice"
                    onBlur={handleBlur}
                    onChange={handleChangePrice}
                    value={values.salePrice}
                  />
                  {errors.salePrice && touched.salePrice && (
                    <Typography sx={style.p}>{errors.salePrice}</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  mt: 4,
                  width: '100%',
                  '& .MuiButton-root': {
                    '&:first-of-type': {
                      mr: 2,
                    },
                    '&:last-of-type': {
                      ml: 2,
                    },
                    fontSize: '1rem',
                    height: '2.5rem',
                    width: '30%',
                  },
                  '@media (max-width: 600px)': {
                    flexDirection: 'column',
                    '& .MuiButton-root': {
                      '&:first-of-type': {
                        mr: 0,
                      },
                      '&:last-of-type': {
                        mt: 4,
                        ml: 0,
                      },
                      fontSize: '1rem',
                      height: '2.5rem',
                      width: '100%',
                    },
                  },
                }}
              >
                <Button
                  variant="outlined"
                  type="submit"
                  sx={{
                    color: theme.white,
                    backgroundColor: theme.brown,
                    '&:hover': {
                      backgroundColor: theme.lightBrown,
                    },
                  }}
                >
                  Enviar
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  type="button"
                  onClick={() => {
                    form.resetForm()
                    handleClose()
                  }}
                  sx={{
                    backgroundColor: theme.gainsboro,
                  }}
                >
                  Cancelar
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Box>
  )
}
