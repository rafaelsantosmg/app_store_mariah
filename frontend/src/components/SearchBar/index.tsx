/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid, Typography } from '@mui/material'
import theme from '../../theme'
import TextFields from '../Inputs/TextFields'

const style = {
  p: {
    color: theme.red,
    ml: 1,
  },
}

export default function SearchBar({ ...props }): JSX.Element {
  const { form } = props
  const { errors, handleBlur, handleChange, touched, values } = form

  return (
    <Grid container justifyContent="space-between" alignItems="center" xs={12}>
      <Box
        sx={{
          background: theme.white,
          display: 'flex',
          width: '100%',
        }}
      >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={2}>
            <TextFields
              id="outlined-number"
              inputProps={{ min: 0 }}
              label="Código"
              name="id"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.id}
            />
            {errors.id && touched.id && (
              <Typography sx={style.p}>{errors.id}</Typography>
            )}
          </Grid>
          <Grid item xs={10}>
            <TextFields
              id="outlined-search"
              label="Busque um produto"
              name="search"
              onBlur={handleBlur}
              onChange={handleChange}
              type="search"
              value={values.search}
            />
            {errors.search && touched.search && (
              <Typography sx={style.p}>{errors.search}</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
