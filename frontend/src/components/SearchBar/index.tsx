/* eslint-disable react-hooks/exhaustive-deps */
import { DataContext } from '@/providers/DataProvider'
import { Box, Grid, Typography } from '@mui/material'
import { use, useContext, useEffect } from 'react'
import theme from '../../theme'
import TextFields from '../Inputs/TextFields'
import { Product } from '@/interfaces/Products'

const style = {
  p: {
    color: theme.red,
    ml: 1,
  },
}

export default function SearchBar(): JSX.Element {
  const { form } = useContext(DataContext)
  const { handleBlur, handleChange, setFieldValue, values } = form

  const handleChangeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      handleChange(event)
      setFieldValue('search', event.target.value)
    }
  }

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(event)
    setFieldValue('search', event.target.value)
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center">
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
              name="searchId"
              onBlur={handleBlur}
              onChange={handleChangeId}
              onFocus={() => {
                setFieldValue('search', '')
                setFieldValue('searchName', '')
              }}
              value={values.searchId}
            />
          </Grid>
          <Grid item xs={10}>
            <TextFields
              id="outlined-search"
              label="Busque um produto"
              name="searchName"
              onBlur={handleBlur}
              onChange={handleChangeName}
              onFocus={() => {
                setFieldValue('search', '')
                setFieldValue('searchId', '')
              }}
              type="search"
              value={values.searchName}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
