import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import background from '../../asset/images/radix-background.jpg'
import theme from '../../theme'

function Header(): JSX.Element {
  const route = useRouter()

  return (
    <Box
      sx={{
        alignItems: 'center',
        background: theme.gradientPurple,
        display: 'flex',
        gridArea: 'header',
        height: '4rem',
        justifyContent: 'center',
        '@media (max-width: 600px)': {
          height: '6rem',
        },
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        md={8}
        xs={10}
        sx={{
          cursor: 'pointer',
          '& img': {
            border: '2px solid white',
            borderRadius: '1rem',
          },
          '& h5': {
            fontWeight: 'bold',
            textShadow: '1px 1px 1px black',
          },
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            '& img': {
              mb: 2,
            },
            h5: {
              fontSize: '1.2rem',
            },
          },
        }}
        onClick={() => route.push('/home')}
      >
        <Image
          src={background}
          width={100}
          height={40}
          alt="Picture of the author"
        />
        <Typography variant="h5" align="center" sx={{ color: theme.white }}>
          Soluções em Tecnologia
        </Typography>
      </Grid>
    </Box>
  )
}

export default Header
