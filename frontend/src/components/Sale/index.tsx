/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Tab, Typography } from '@mui/material'
import theme from '../../theme'
import TextFields from '../Inputs/TextFields'
import SearchBar from '../SearchBar'
import SortTable from '../Table'
import { useContext } from 'react'
import { DataContext } from '../../providers/DataProvider'

const style = {
  p: {
    color: theme.red,
    ml: 1,
  },
}

export default function Sale({ ...props }): JSX.Element {
  const { searchProducts } = useContext(DataContext)
  const { form, handleClose } = props
  const { errors, handleBlur, handleChange, handleSubmit, touched, values } =
    form

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
        <Grid container xs={11} rowGap={2}>
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
                color: theme.black,
                '@media (max-width: 600px)': {
                  fontSize: '1.3rem',
                },
              }}
            >
              Venda
            </Typography>
          </Grid>
          <Grid container xs={12} columnSpacing={1}>
            <Grid item xs={2}>
              <TextFields
                label="Código"
                name="id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id}
              />
              {errors.id && touched.id && (
                <Typography sx={style.p}>{errors.id}</Typography>
              )}
            </Grid>
            <Grid item xs={10}>
              <SearchBar />
            </Grid>
          </Grid>
          {searchProducts.length > 0 && <SortTable />}
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
          <Button variant="contained" color="success" type="submit">
            Finalizar Venda
          </Button>

          <Button
            variant="contained"
            color="error"
            type="button"
            onClick={() => {
              form.resetForm()
              handleClose()
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </>
    </form>
  )
}
