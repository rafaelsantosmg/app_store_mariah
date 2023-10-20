import theme from '@/theme'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'

export default function DateTime() {
  const [dateTime, setDateTime] = useState(
    format(new Date(), "'Dia' dd 'de' MMMM 'às' HH:mm", {
      locale: ptBR,
    })
  )

  useEffect(() => {
    const timeId = setInterval(() => {
      setDateTime(
        format(new Date(), "'Dia' dd 'de' MMMM 'às' HH:mm", {
          locale: ptBR,
        })
      )
    }, 1000)

    return () => {
      clearTimeout(timeId)
    }
  }, [dateTime])

  return (
    <Typography
      variant="h3"
      sx={{
        color: theme.brown,
        textAlign: 'left',
        minWidth: '26.5rem',
        paddingRight: '0.7rem',
      }}
    >
      {dateTime || 'Carregando...'}
    </Typography>
  )
}
