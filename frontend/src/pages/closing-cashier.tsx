import LoaderSpinner from '@/components/LoaderSpinner'
import ModalContent from '@/components/ModalContent'
import api from '@/services'
import theme from '@/theme'
import { formatedCurrency } from '@/utils/formate-values'
import { Button, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import CashRegister from '../asset/images/cash-register.png'
import { format } from 'date-fns'

export default function ClosingCashier({ ...props }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [sales, setSales] = useState([])

  useEffect(() => {
    async function getSalesByDate() {
      const today = format(new Date(), 'yyyy-MM-dd')
      const { data } = await api.get(`/sales/by-date/${today}`)
      const salesData = data.map((sale: any) => ({
        ...sale,
        paymentMethod: sale.Payments[0].method,
      }))
      setSales(salesData)
    }
    getSalesByDate()
  }, [])

  async function handleConfirm() {
    try {
      setLoading(true)
      const today = format(new Date(), 'yyyy-MM-dd')
      const data = {
        initialDate: today,
        finalDate: today,
      }
      await api.post('/daily-movements', data)
      toast.success('Caixa fechado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Erro ao fechar caixa!')
    } finally {
      router.push('/home')
      setLoading(false)
      setOpenModal(false)
    }
  }

  function handleClose() {
    router.push('/home')
  }

  function getPaymentMoney(sales: any[]) {
    const salesMoney = sales.filter(
      (sale: any) => sale.paymentMethod === 'money'
    )
    return salesMoney.reduce((acc: any, sale: any) => {
      acc += sale.totalPrice
      return acc
    }, 0)
  }

  function getPaymentPix(sales: any[]) {
    const salesPix = sales.filter((sale: any) => sale.paymentMethod === 'pix')
    return salesPix.reduce((acc: any, sale: any) => {
      acc += sale.totalPrice
      return acc
    }, 0)
  }

  function getPaymentDebit(sales: any[]) {
    const salesDebit = sales.filter(
      (sale: any) => sale.paymentMethod === 'debit_card'
    )
    return salesDebit.reduce((acc: any, sale: any) => {
      acc += sale.totalPrice
      return acc
    }, 0)
  }

  function getPaymentCredit(sales: any[]) {
    const salesCredit = sales.filter(
      (sale: any) => sale.paymentMethod === 'credit_card'
    )
    return salesCredit.reduce((acc: any, sale: any) => {
      acc += sale.totalPrice
      return acc
    }, 0)
  }

  const totalMoney = getPaymentMoney(sales)
  const totalPix = getPaymentPix(sales)
  const totalDebit = getPaymentDebit(sales)
  const totalCredit = getPaymentCredit(sales)
  const totalSales = totalMoney + totalPix + totalDebit + totalCredit

  return (
    (loading && <LoaderSpinner />) || (
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 2, width: '100%' }}
      >
        <Typography variant="h3" color={theme.brown}>
          Fechamento de Caixa
        </Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 2, width: '100%' }}
        >
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ textTransform: 'uppercase' }}
              >
                Caixa Inicial
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ fontWeight: 700 }}
              >
                {formatedCurrency(200)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ textTransform: 'uppercase' }}
              >
                Número de Vendas
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ fontWeight: 700 }}
              >
                {sales.length}
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 3 }}>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ textTransform: 'uppercase' }}
              >
                Vendas em Dinheiro
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ fontWeight: 700 }}
              >
                {formatedCurrency(totalMoney)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ textTransform: 'uppercase' }}
              >
                Vendas em Pix
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ fontWeight: 700 }}
              >
                {formatedCurrency(totalPix)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ textTransform: 'uppercase' }}
              >
                Vendas no Cartão de Débito
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ fontWeight: 700 }}
              >
                {formatedCurrency(totalDebit)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ textTransform: 'uppercase' }}
              >
                Vendas no Cartão de Crédito
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ fontWeight: 700 }}
              >
                {formatedCurrency(totalCredit)}
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ mt: 5 }}>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ textTransform: 'uppercase' }}
              >
                Total de Vendas
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography
                variant="h5"
                color={theme.brown}
                sx={{ fontWeight: 700 }}
              >
                {formatedCurrency(totalSales)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mt: 5,
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
            onClick={() => setOpenModal(true)}
            variant="outlined"
            type="button"
            sx={{
              color: theme.white,
              backgroundColor: theme.brown,
              '&:hover': {
                backgroundColor: theme.lightBrown,
              },
            }}
          >
            Confirmar
          </Button>

          <Button
            variant="outlined"
            color="error"
            type="button"
            onClick={handleClose}
            sx={{
              backgroundColor: theme.gainsboro,
            }}
          >
            Cancelar
          </Button>
        </Grid>

        <ModalContent
          open={openModal}
          renderButtons={
            <Grid
              container
              justifyContent="space-between"
              sx={{ width: '100%' }}
            >
              <Button
                onClick={handleConfirm}
                variant="outlined"
                type="button"
                sx={{
                  color: theme.white,
                  backgroundColor: theme.brown,
                  '&:hover': {
                    backgroundColor: theme.lightBrown,
                  },
                }}
              >
                Confirmar fechamento de caixa
              </Button>

              <Button
                variant="outlined"
                color="error"
                type="button"
                onClick={() => setOpenModal(false)}
                sx={{
                  backgroundColor: theme.gainsboro,
                }}
              >
                Cancelar
              </Button>
            </Grid>
          }
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Image
              width={200}
              src={CashRegister}
              alt="Imagem de caixa registradora"
            />
            <Typography variant="h4" color={theme.brown} sx={{ mt: 5 }}>
              Caixa de hoje será fechado, essa ação não poderá ser desfeita.
            </Typography>
          </Grid>
        </ModalContent>
      </Grid>
    )
  )
}
