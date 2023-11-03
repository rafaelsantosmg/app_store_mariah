import theme from '@/theme'
import Typography from '@mui/material/Typography'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect, useState } from 'react'

export default function DateTime({ ...props }) {
  const { fulltime } = props
  const [dateTime, setDateTime] = useState(new Date())

  useEffect(() => {
    const timeId = setInterval(() => {
      setDateTime(new Date())
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
      {format(
        dateTime,
        `'Dia' dd 'de' MMMM 'às' ${fulltime ? 'HH:mm:ss' : 'HH:mm'}`,
        {
          locale: ptBR,
        }
      )}
    </Typography>
  )
}
