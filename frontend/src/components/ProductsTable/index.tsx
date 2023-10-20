/* eslint-disable react-hooks/exhaustive-deps */
import theme from '@/theme'
import { filterListProducts } from '@/utils/filterProducts'
import {
  formateValueInputNumeric,
  formateValueUnitKg,
} from '@/utils/formate-values'
import { Button, Grid, TableHead } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { Product } from '../../interfaces/Products'
import { DataContext } from '../../providers/DataProvider'
import { Order, TSaleProduct, TSelected } from '../../types'
import TextFields from '../Inputs/TextFields'
import LoaderSpinner from '../LoaderSpinner'

function createData(
  id: number,
  code: string,
  name: string,
  description: string,
  stockType: string,
  stock: number,
  costPrice: number,
  salePrice: number
): Product {
  return { id, code, name, description, stockType, stock, costPrice, salePrice }
}

function orderByStringOfNumber<T>(a: T, b: T, orderBy: keyof T): number {
  if (Number(b[orderBy]) < Number(a[orderBy])) {
    return -1
  }
  if (Number(b[orderBy]) > Number(a[orderBy])) {
    return 1
  }
  return 0
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (orderBy === 'id') {
    return orderByStringOfNumber(a, b, orderBy)
  }
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof number | string>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export default function ProductsTable({ ...props }): JSX.Element {
  const { loading, products, form, saleProducts } = useContext(DataContext)
  const { handleClickProducts } = props
  const { setFieldValue, values, handleBlur } = form
  const [order] = useState<Order>('asc')
  const [orderBy] = useState<keyof Product>('code')
  const [selected, setSelected] = useState<TSelected>({
    id: 0,
    code: '0000',
    name: '',
    stockType: '',
  })
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  const listProducts = filterListProducts(
    products,
    form.values?.searchCode,
    form.values?.searchName
  )

  useEffect(() => {
    if (listProducts.length && listProducts[0].code !== selected.code) {
      setSelected({
        id: listProducts[0].id,
        code: listProducts[0].code,
        name: listProducts[0].name,
        stockType: listProducts[0].stockType,
      })
    }
  }, [form.values.search])

  const rows = listProducts.map((product: Product) =>
    createData(
      product.id,
      product.code,
      product.name,
      product.description,
      product.stockType,
      product.stock,
      product.costPrice,
      product.salePrice
    )
  )

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  )

  const handleClear = () => {
    setFieldValue('quantity', '')
    setFieldValue('searchCode', '')
    setFieldValue('searchName', '')
    setFieldValue('search', '')
  }

  const handleClick = (prod: TSelected) => {
    const { id, code, stockType, name } = products.find(
      (product: Product) =>
        product.code === prod.code || product.name === prod.name
    ) || { id: 0, code: '0000', stockType: 'UN', name: '' }
    const product: TSaleProduct = {
      productId: id,
      productCode: code,
      quantity: values.quantity,
      stockType,
      productName: name,
    }
    if (name !== 'PRODUTOS FIADO') delete product.productName
    if (values.products.length > 0) {
      const productIndex = values.products.findIndex(
        (prod: TSaleProduct) => prod.productCode === code
      )
      if (productIndex !== -1) {
        const products = values.products
        const sumQuantity =
          Number(products[productIndex].quantity) + Number(values.quantity)
        if (products[productIndex].stockType === 'UN') {
          products[productIndex].quantity = sumQuantity
        } else {
          products[productIndex].quantity = sumQuantity.toString()
        }
        setFieldValue('products', products)
        handleClear()
        return
      }
    }
    setFieldValue('products', [...values.products, product])
    handleClear()
  }

  const handleQuantityUN = (
    searchProduct: any,
    product: any,
    inputQuantity: string
  ) => {
    if (Number(searchProduct.quantity) > 0) {
      const quantity =
        Number(inputQuantity) > product.stock - Number(searchProduct.quantity)
          ? product.stock - Number(searchProduct.quantity)
          : inputQuantity
      setFieldValue('quantity', quantity)
      return
    }
    const quantity =
      Number(inputQuantity) > product.stock ? product.stock : inputQuantity
    setFieldValue('quantity', quantity)
    return
  }

  const handleQuantityKG = (
    searchProduct: any,
    product: any,
    inputQuantity: string
  ) => {
    if (Number(searchProduct.quantity) > 0) {
      const quantity =
        parseFloat(inputQuantity) >
        product.stock - Number(searchProduct.quantity)
          ? (product.stock - Number(searchProduct.quantity)).toFixed(3)
          : inputQuantity
      setFieldValue('quantity', quantity)
      return
    }
    const quantity =
      parseFloat(inputQuantity) > product.stock
        ? product.stock.toFixed(3)
        : inputQuantity
    setFieldValue('quantity', quantity)
    return
  }

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const inputQuantity = formateValueInputNumeric(event.target.value)
    if (selected.code) {
      const searchProduct = saleProducts.find(
        (prod) => prod.code === selected.code
      ) || { quantity: 0 }
      const product = products.find(
        (product) => product.code === selected.code
      ) || { stock: 0, stockType: 'UN' }
      if (product.stockType === 'UN') {
        handleQuantityUN(searchProduct, product, inputQuantity)
      } else handleQuantityKG(searchProduct, product, inputQuantity)
    }
  }

  const handleSelected = (prod: TSelected) => {
    if (prod.code !== selected.code) {
      setSelected({
        id: prod.id,
        code: prod.code,
        name: prod.name,
        stockType: prod.stockType,
      })
    }
    if (
      handleClickProducts.handleSelectProduct &&
      handleClickProducts.setViewTable
    ) {
      handleClickProducts.handleSelectProduct(prod)
      handleClickProducts.setViewTable(false)
    }
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return loading ? (
    <LoaderSpinner />
  ) : (
    <Grid container sx={{ mt: 2 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell>Cod</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell align="left" padding="none">
                  Tipo
                </TableCell>
                <TableCell align="left">Estoque</TableCell>
                <TableCell align="left">Preço</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    hover
                    onClick={() => handleSelected(row)}
                    tabIndex={-1}
                    key={row.code}
                    selected={row.code === selected.code}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {row.code}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left" padding="none">
                      {row.stockType}
                    </TableCell>
                    <TableCell align="left">
                      {row.stockType === 'KG' && row.stock < 1
                        ? formateValueUnitKg(row.stock) + 'g'
                        : row.stockType === 'KG'
                        ? formateValueUnitKg(row.stock) + 'kg'
                        : row.stock}
                    </TableCell>
                    <TableCell align="left">
                      {row.salePrice.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {listProducts.length > rowsPerPage && (
          <>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Linhas por página:"
            />
          </>
        )}
      </Paper>
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <TextFields
            name="quantity"
            label="Quantidade"
            variant="outlined"
            onChange={handleChangeQuantity}
            onBlur={handleBlur}
            value={values.quantity}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            sx={{
              color: theme.white,
              backgroundColor: theme.brown,
              '&:hover': {
                backgroundColor: theme.lightBrown,
              },
              '&:disabled': {
                backgroundColor: theme.gainsboro,
              },
            }}
            onClick={() => handleClick(selected)}
            disabled={values.quantity === 0 || values.quantity === ''}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
