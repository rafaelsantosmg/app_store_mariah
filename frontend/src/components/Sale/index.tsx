/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid, Table, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataProvider'
import theme from '../../theme'
import SearchBar from '../SearchBar'
import SortTable from '../Table'
import SaleTable from '../SaleTable'
import TextFields from '../Inputs/TextFields'
import SelectFields from '../Inputs/SelectFields'

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

export default function Sale({ ...props }): JSX.Element {
  const MAX_DISCOUNT = 10 // 10%
  const PAYMENT_METHODS = [
    'Dinheiro',
    'Pix',
    'Cartão de Crédito',
    'Cartão de Débito',
  ]
  const { searchProducts, saleProducts } = useContext(DataContext)
  const { form, handleClose } = props
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    values,
  } = form
  const [viewTable, setViewTable] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    searchProducts.length > 0 ? setViewTable(true) : setViewTable(false)
  }, [searchProducts])

  useEffect(() => {
    const totalProducts = saleProducts.reduce(
      (acc, product) => acc + product.price * product.quantity,
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
        gridArea: 'form',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <>
        <Grid container xs={12}>
          <Grid
            item
            xs={12}
            sx={{
              mb: 3,
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
          <Grid container xs={12}>
            <SearchBar form={form} />
            {viewTable ? (
              <SortTable setViewTable={setViewTable} form={form} />
            ) : (
              <SaleTable form={form} />
            )}
          </Grid>
        </Grid>
        <Grid container xs={12} justifyContent="space-between" sx={{ mt: 5 }}>
          <Grid item xs={3}>
            <TextFields
              label="total"
              value={total.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
              inputProps={{ readOnly: true, min: 0 }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextFields
              label="Desconto %"
              name="discount"
              type="number"
              InputProps={{ min: 0, max: MAX_DISCOUNT }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.discount}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectFields
              label="Forma de Pagamento"
              name="paymentMethod"
              options={PAYMENT_METHODS}
              clearField={() => setFieldValue('paymentMethod', '')}
              value={values.paymentMethod}
              onChange={handleChange}
              onClose={handleChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
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
            variant="contained"
            type="submit"
            sx={{
              color: theme.brown,
            }}
          >
            Finalizar Venda
          </Button>

          <Button
            variant="contained"
            color="error"
            type="button"
            onClick={() => {
              resetForm()
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
