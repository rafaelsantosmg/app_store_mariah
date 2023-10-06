/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import theme from '../../theme'
import TextFields from '../Inputs/TextFields'

const style = {
  p: {
    color: theme.red,
    ml: 1,
  },
}

export default function Form({ ...props }): JSX.Element {
  const routes = useRouter()
  const { form } = props
  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    values,
  } = form

  useEffect(() => {
    const salePrice =
      Number(values.costPrice) +
      Number(values.costPrice) * (Number(values.percentage) / 100)
    setFieldValue('salePrice', salePrice)
  }, [values.percentage])

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gridArea: 'form',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <>
        <Grid container md={8} xs={10} rowGap={2}>
          <Grid
            item
            xs={12}
            sx={{
              mb: 1,
              mt: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: theme.brown,
                '@media (max-width: 600px)': {
                  fontSize: '1.2rem',
                },
              }}
            >
              Cadastro de Produtos
            </Typography>
          </Grid>
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
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <TextFields
              defaultValue={0}
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
          <Grid item xs={12}>
            <TextFields
              defaultValue={0}
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
          </Grid>
          <Grid item xs={12}>
            <TextFields
              defaultValue={0}
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
          </Grid>
          <Grid item xs={12}>
            <TextFields
              defaultValue={0}
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
          md={8}
          xs={10}
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
            Cadastrar
          </Button>

          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={() => {
              form.resetForm()
              routes.push('/home', { scroll: false })
            }}
            sx={{
              backgroundColor: theme.gainsboro,
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </>
    </form>
  )
}
