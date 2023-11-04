/* eslint-disable react-hooks/exhaustive-deps */
import { DataContext } from '@/providers/DataProvider'
import {
  formateValueInputNumeric,
  formateValueInputNumericPrice,
} from '@/utils/formate-values'
import { Button, Grid, Typography } from '@mui/material'
import { ChangeEvent, useContext, useEffect, useRef } from 'react'
import theme from '../../theme'
import SelectFields from '../Inputs/SelectFields'
import TextFields from '../Inputs/TextFields'

const style = {
  p: {
    color: theme.red,
    ml: 1,
  },
}

const stockTypes = ['UNIDADE', 'QUILOGRAMA']

export default function ProductForm({ ...props }): JSX.Element {
  const { products } = useContext(DataContext)
  const { form, setProduct, type, setOpenAddProduct } = props
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    values,
  } = form
  const inputRefName = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRefName.current?.focus()
  }, [])

  const handleChangeStock = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = formateValueInputNumeric(event.target.value)
    setFieldValue(event.target.name, inputQuantity)
  }

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = formateValueInputNumericPrice(event.target.value)
    setFieldValue(event.target.name, inputQuantity)
  }

  return (
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
      <Grid container rowGap={3} justifyContent="center" sx={{ width: '90%' }}>
        <Grid container justifyContent="space-between">
          <Typography
            variant="h2"
            sx={{
              color: theme.brown,
              '@media (max-width: 600px)': {
                fontSize: '1.2rem',
              },
            }}
          >
            {type === 'edit' ? 'Editar Produto' : 'Cadastrar Produto'}
          </Typography>
          <Grid item xs={2}>
            <TextFields
              label="Código"
              value={
                type === 'edit'
                  ? values.code
                  : Number(products[products.length - 1].code) + 1
              }
              disabled
            />
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
              inputProps={{ ref: inputRefName }}
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
          {/* <Grid item xs={3}>
            <TextFields
              inputProps={{ min: 0 }}
              label="Porcentagem de Lucro"
              name="percentage"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.percentage}
            />
            {errors.percentage && touched.percentage && (
              <Typography sx={style.p}>{errors.percentage}</Typography>
            )}
          </Grid> */}
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
            {type === 'edit' ? 'Editar' : 'Cadastrar'}
          </Button>

          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={() => {
              form.resetForm()
              if (type === 'edit') setProduct({})
              else setOpenAddProduct(false)
            }}
            sx={{
              backgroundColor: theme.gainsboro,
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
