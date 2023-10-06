/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel'
import Paper from '@mui/material/Paper'
import Switch from '@mui/material/Switch'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'
import {
  ChangeEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Product } from '../../interfaces/Products'
import { EnhancedTableProps, HeadCell } from '../../interfaces/Table'
import { DataContext } from '../../providers/DataProvider'
import { Order, TSaleProduct, TSelected } from '../../types'
import TextFields from '../Inputs/TextFields'
import LoaderSpinner from '../LoaderSpinner'

function createData(
  id: number,
  name: string,
  description: string,
  stock: number,
  costPrice: number,
  salePrice: number
): Product {
  return { id, name, description, stock, costPrice, salePrice }
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

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Produto',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Descrição',
  },
  {
    id: 'stock',
    numeric: false,
    disablePadding: false,
    label: 'Estoque',
  },
  {
    id: 'salePrice',
    numeric: true,
    disablePadding: false,
    label: 'Preço',
  },
]

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof Product) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'id' ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default function SortTable({ ...props }): JSX.Element {
  const { setViewTable, form } = props
  const { setFieldValue, values, handleChange, handleBlur } = form
  const { searchProducts, loading, products } = useContext(DataContext)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Product>('name')
  const [selected, setSelected] = useState<TSelected>({
    id: 0,
    name: '',
  })
  const [page, setPage] = useState<number>(0)
  const [dense, setDense] = useState<boolean>(false)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)

  useEffect(() => {
    if (searchProducts.length === 1) {
      setSelected(searchProducts[0])
    }
  }, [searchProducts])

  const rows = searchProducts.map((product: Product) =>
    createData(
      product.id,
      product.name,
      product.description,
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

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClear = () => {
    setFieldValue('quantity', 0)
    setFieldValue('id', 0)
    setFieldValue('search', '')
    setViewTable(false)
  }

  const handleClick = (prod: TSelected) => {
    const productId = products.find(
      (product: Product) =>
        product.id === prod.id || product.name.includes(prod.name)
    )?.id
    const product = {
      productId,
      quantity: values.quantity,
    }
    if (values.products.length > 0) {
      const productIndex = values.products.findIndex(
        (prod: TSaleProduct) => prod.productId === productId
      )
      if (productIndex !== -1) {
        const products = values.products
        products[productIndex].quantity += values.quantity
        setFieldValue('products', products)
        handleClear()
        return
      }
    }
    setFieldValue('products', [...values.products, product])
    handleClear()
  }

  const handleSelected = (prod: TSelected) => {
    if (prod.id === selected.id) {
      setSelected({
        id: 0,
        name: '',
      })
    } else
      setSelected({
        id: prod.id,
        name: prod.name,
      })
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return loading ? (
    <LoaderSpinner />
  ) : (
    <Grid container xs={12} sx={{ mt: 2 }}>
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Grid item>
          <TextFields
            name="quantity"
            label="Quantidade"
            type="number"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.quantity}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleClick(selected)}
            disabled={values.quantity === 0 || values.quantity === ''}
          >
            Adicionar
          </Button>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    hover
                    onClick={() => handleSelected(row)}
                    tabIndex={-1}
                    key={row.name}
                    selected={row.id === selected.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="center"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.stock}</TableCell>
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
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {products.length > rowsPerPage && (
          <>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Linhas por página:"
            />
            <Grid container justifyContent="space-between">
              <Grid item sx={{ m: 2 }}>
                <FormControlLabel
                  control={
                    <Switch checked={dense} onChange={handleChangeDense} />
                  }
                  label="Desativar espaçamento"
                />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  )
}
