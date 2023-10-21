/* eslint-disable react-hooks/exhaustive-deps */
import { filterProductsInSale } from '@/utils/filterProducts'
import { formatedCurrency } from '@/utils/formate-values'
import { Button, Grid, Typography } from '@mui/material'
import { Fragment, useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataProvider'
import theme from '../../theme'
import TextFields from '../Inputs/TextFields'
import SortTable from '../ProductsTable'
import SaleTable from '../SaleTable'
import SearchBar from '../SearchBar'

export default function SaleScreenSpun({ ...props }): JSX.Element {
  const { saleProducts, form, products } = useContext(DataContext)
  const { handleClose } = props
  const { handleSubmit, resetForm, setFieldValue, values } = form
  const [viewTable, setViewTable] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    setFieldValue('saleType', 'saleSpun')
    setFieldValue('paymentMethod', 'money')
  }, [])

  useEffect(() => {
    const listProducts = filterProductsInSale(products, values?.search)
    if (listProducts.length === 0 || values?.search === '') {
      setViewTable(false)
    } else {
      setViewTable(true)
    }
  }, [values?.search])

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
  }, [saleProducts])

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
          variant="h2"
          sx={{
            color: theme.brown,
            '@media (max-width: 600px)': {
              fontSize: '1rem',
            },
          }}
        >
          Realizar Venda Fiada
        </Typography>
      </Grid>
      <Fragment>
        <Grid container>
          <Grid container>
            <SearchBar />
            {viewTable ? <SortTable /> : <SaleTable />}
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" sx={{ mt: 5 }}>
          <Grid item xs={3}>
            <TextFields
              label="Total"
              value={formatedCurrency(total)}
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
