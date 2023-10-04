import { CircularProgress } from '@mui/material'
import Stack from '@mui/material/Stack'

export default function LoaderSpinner(): JSX.Element {
  return (
    <Stack
      sx={{
        color: 'grey.500',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        mt: 10,
      }}
      spacing={2}
    >
      <CircularProgress color="secondary" size={70} />
    </Stack>
  )
}
