/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'
import theme from '../../theme'
import TextFields from '../Inputs/TextFields'

const style = {
  p: {
    color: theme.red,
    ml: 1,
  },
}

export default function ProductForm({ ...props }): JSX.Element {
  const { form, setProduct, type, setOpenAddProduct } = props
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    form
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (values.name === '') inputRef.current?.focus()
  }, [values.name])

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
        width: '100%',
      }}
    >
      <Grid container rowGap={2} justifyContent="center" sx={{ width: '90%' }}>
        <Grid item xs={12}>
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
        </Grid>
        <Grid container rowGap={2}>
          <Grid item xs={12}>
            <TextFields
              label="Nome"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              inputProps={{ ref: inputRef }}
            />
            {errors.name && touched.name && (
              <Typography sx={style.p}>{errors.name}</Typography>
            )}
          </Grid>
          {/* <Grid item xs={12}>
            <TextFields
              label="Descrição"
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
            />
            {errors.description && touched.description && (
              <Typography sx={style.p}>{errors.description}</Typography>
            )}
          </Grid> */}
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item xs={5}>
            <TextFields
              inputProps={{ min: 0 }}
              label="Estoque"
              name="stock"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.stock}
            />
            {errors.stock && touched.stock && (
              <Typography sx={style.p}>{errors.stock}</Typography>
            )}
          </Grid>
          {/* <Grid item xs={5}>
            <TextFields
              inputProps={{ min: 0 }}
              label="Preço de Custo"
              name="costPrice"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.costPrice}
            />
            {errors.costPrice && touched.costPrice && (
              <Typography sx={style.p}>{errors.costPrice}</Typography>
            )}
          </Grid> */}
        </Grid>
        <Grid container justifyContent="space-between">
          {/* <Grid item xs={5}>
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
              onChange={handleChange}
              type="number"
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
