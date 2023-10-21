/* eslint-disable react-hooks/exhaustive-deps */
import theme from '@/theme'
import { filterListProducts } from '@/utils/filterProducts'
import EditIcon from '@mui/icons-material/Edit'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
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
import { DataContext } from '../../providers/DataProvider'
import {
  formateValueUnitKg,
  formatedCurrency,
} from '../../utils/formate-values'
import EditProduct from '../EditProduct'
import ModalContent from '../ModalContent'

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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
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

interface HeadCell {
  disablePadding: boolean
  id: keyof Product
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'code',
    numeric: false,
    disablePadding: false,
    label: 'Código',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Produto',
  },
  {
    id: 'stockType',
    numeric: false,
    disablePadding: false,
    label: 'Tipo',
  },
  {
    id: 'stock',
    numeric: false,
    disablePadding: false,
    label: 'Estoque',
  },
  {
    id: 'costPrice',
    numeric: true,
    disablePadding: false,
    label: 'Preço de custo',
  },
  {
    id: 'salePrice',
    numeric: true,
    disablePadding: false,
    label: 'Preço de venda',
  },
]

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof Product) => void
  order: Order
  orderBy: string
}

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
            align={
              ['ID', 'Editar', 'Tipo'].includes(headCell.label)
                ? 'center'
                : 'left'
            }
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
        <TableCell align="center">Editar</TableCell>
      </TableRow>
    </TableHead>
  )
}

export default function ListProductsTable() {
  const { products, form } = useContext(DataContext)
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Product>('code')
  const [page, setPage] = useState(0)
  const [pastPage, setPastPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [product, setProduct] = useState<Product>({} as Product)

  useEffect(() => {
    if (
      form.values?.searchCode.length > 0 ||
      form.values?.searchName.length > 0
    ) {
      setPage(0)
      setOrderBy('name')
    } else {
      setPage(pastPage)
      setOrderBy('code')
    }
  }, [form.values?.searchCode, form.values?.searchName])

  const listProducts = filterListProducts(
    products,
    form.values?.searchCode,
    form.values?.searchName
  )

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

  const handleEdit = (code: string) => {
    const product = products.find((product: Product) => product.code === code)
    setProduct(product as Product)
  }

  const handleRequestSort = (
    _event: MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
    setPastPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rows, rowsPerPage]
  )

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row) => {
                  return (
                    <TableRow key={row.code}>
                      <TableCell component="th" scope="row" padding="none">
                        {row.code}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="center">{row.stockType}</TableCell>
                      <TableCell align="left">
                        {row.stockType === 'KG' && row.stock < 1
                          ? formateValueUnitKg(row.stock) + 'g'
                          : row.stockType === 'KG'
                          ? formateValueUnitKg(row.stock) + 'kg'
                          : row.stock}
                      </TableCell>
                      <TableCell align="left">
                        {formatedCurrency(row.costPrice)}
                      </TableCell>
                      <TableCell align="left">
                        {formatedCurrency(row.salePrice)}
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() => handleEdit(row.code)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <EditIcon sx={{ color: theme.brown }} />
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Linhas por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
          />
        </Paper>
      </Box>
      <ModalContent
        open={product.code ? true : false}
        handleClose={() => setProduct({} as Product)}
      >
        <EditProduct product={product} setProduct={setProduct} />
      </ModalContent>
    </>
  )
}
