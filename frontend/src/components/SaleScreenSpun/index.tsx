/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Typography } from '@mui/material'
import { Fragment, useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataProvider'
import theme from '../../theme'
import SelectFields from '../Inputs/SelectFields'
import TextFields from '../Inputs/TextFields'
import SortTable from '../ProductsTable'
import SaleTable from '../SaleTable'
import SearchBar from '../SearchBar'

export default function SaleScreenSpun({ ...props }): JSX.Element {
  const { searchProducts, saleProducts, form, dateTime } =
    useContext(DataContext)
  const { handleClose } = props
  const { handleSubmit, resetForm, setFieldValue, values } = form
  const [viewTable, setViewTable] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    setFieldValue('saleType', 'saleSpun')
    setFieldValue('paymentMethod', 'money')
  }, [])

  useEffect(() => {
    searchProducts.length > 0 ? setViewTable(true) : setViewTable(false)
  }, [searchProducts])

  useEffect(() => {
    const totalProducts = saleProducts.reduce(
      (acc, product) =>
        acc +
        product.salePrice *
          (typeof product.quantity === 'number'
            ? product.quantity
            : Number(product.quantity.split(',').join('.'))),
      0
    )
    const discont = (totalProducts * values.discount) / 100 || 0

    setTotal(totalProducts - discont)
  }, [saleProducts, values.discount])

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 2, width: '100%' }}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme.brown,
            '@media (max-width: 600px)': {
              fontSize: '1.2rem',
            },
          }}
        >
          Realizar Venda Fiada
        </Typography>
        <Typography
          variant="h3"
          sx={{
            color: theme.brown,
            '@media (max-width: 600px)': {
              fontSize: '1.2rem',
            },
          }}
        >
          {dateTime}
        </Typography>
      </Grid>
      <Fragment>
        <Grid container>
          <Grid container>
            <SearchBar />
            {viewTable ? (
              <SortTable setViewTable={setViewTable} />
            ) : (
              <SaleTable />
            )}
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ mt: 5 }}>
          <Grid item xs={3}>
            <TextFields
              label="Total"
              value={total.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
              inputProps={{ readOnly: true, min: 0 }}
            />
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
            Finalizar Venda
          </Button>

          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={() => {
              resetForm()
              handleClose()
            }}
            sx={{
              backgroundColor: theme.gainsboro,
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </Fragment>
    </form>
  )
}
