import theme from '@/theme'
import { Grid, Typography } from '@mui/material'

export default function ClosingCashier({ ...props }) {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ mb: 2, width: '100%' }}
    >
      <Typography variant="h3" color={theme.brown}>
        Fechamento de Caixa
      </Typography>
    </Grid>
  )
}
