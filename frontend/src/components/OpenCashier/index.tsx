import theme from '@/theme'
import { Button, Grid, Typography } from '@mui/material'

export default function OpenCashier({ ...props }) {
  const { handleClose } = props

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 2, width: '100%' }}
    >
      <Typography variant="h3" color={theme.brown}>
        Abertura de Caixa
      </Typography>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2, width: '100%' }}
      >
        <Typography color={theme.brown}>
          Tudo que desejo é arriscado, mas Iemanjá sempre me deu força e clareza
          para fazer uma passagem maravilhosa!
        </Typography>
        <Typography color={theme.brown}>
          Mudar pode dar medo, mas é uma aventura que pode te levar muito longe.
        </Typography>
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
    </Grid>
  )
}
