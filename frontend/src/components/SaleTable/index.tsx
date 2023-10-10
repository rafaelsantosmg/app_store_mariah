/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from '@/interfaces/Products'
import { DataContext } from '@/providers/DataProvider'
import theme from '@/theme'
import { TProductSale, TSaleProduct } from '@/types'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveIcon from '@mui/icons-material/Remove'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { ChangeEvent, Fragment, HTMLProps, useContext, useEffect } from 'react'
import TextFields from '../Inputs/TextFields'

function createData(
  id: number,
  name: string,
  stockType: string,
  quantity: string | number,
  salePrice: number
): TProductSale {
  return { id, name, stockType, quantity, salePrice }
}

function AddRemoveQuantityUn({ ...props }): JSX.Element {
  const { handleAddQuantity, handleRemoveQuantity, row } = props
  return (
    <Fragment>
      <button
        style={{
          cursor: 'pointer',
          border: `1px solid ${theme.brown}`,
          borderRadius: '0.5rem',
        }}
        onClick={() => handleRemoveQuantity(row.id)}
      >
        <RemoveIcon sx={{ color: theme.brown }} />
      </button>
      {row.quantity}
      <button
        style={{
          cursor: 'pointer',
          border: `1px solid ${theme.brown}`,
          borderRadius: '0.5rem',
        }}
        onClick={() => handleAddQuantity(row.id)}
      >
        <AddIcon sx={{ color: theme.brown }} />
      </button>
    </Fragment>
  )
}

function AddRemoveQuantityKg({ ...props }): JSX.Element {
  const { row, handleChanceQuantity } = props
  return (
    <TextFields
      name="quantity"
      value={row.quantity}
      sx={{ width: '6rem' }}
      onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
        handleChanceQuantity(target.value, row.id)
      }
    />
  )
}

export default function SaleTable(): JSX.Element {
  const { products, setSaleProducts, form } = useContext(DataContext)
  const { values, setFieldValue } = form

  const filteredProducts = values.products.map((product: TSaleProduct) => ({
    ...products.find((p: Product) => p.id === product.productId),
    quantity: product.quantity,
  }))

  useEffect(() => {
    setSaleProducts(filteredProducts)
  }, [values.products])

  const rows = filteredProducts.map((product: TProductSale) =>
    createData(
      product.id,
      product.name,
      product.stockType,
      product.quantity,
      product.salePrice
    )
  )

  const handleDellete = (id: number) => {
    const saleProducts = values.products.filter(
      (product: TSaleProduct) => product.productId !== id
    )
    setFieldValue('products', saleProducts)
  }

  const handleChanceQuantity = (value: string, id: number) => {
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productId === id) {
        return { ...product, quantity: value }
      }
      return product
    })
    setFieldValue('products', saleProducts)
  }

  const sumAddQuantity = (
    productQuantity: string | number,
    productStock: string | number = 0,
    stockType: string = 'UN'
  ): number => {
    if (productQuantity === productStock) {
      return Number(productQuantity)
    }
    const sum = stockType === 'UN' ? 1 : 0.05
    const quantity = Number(
      (typeof productQuantity === 'number'
        ? productQuantity
        : Number(productQuantity.split(',').join('.'))) + sum
    )
    return quantity
  }

  const subRemoveQuantity = (
    productQuantity: string | number,
    stockType: string = 'UN'
  ): number => {
    const sub = stockType === 'UN' ? 1 : 0.05
    const quantity = Number(
      (typeof productQuantity === 'number'
        ? productQuantity
        : Number(productQuantity.split(',').join('.'))) - sub
    )
    return quantity
  }

  const handleAddQuantity = (id: number) => {
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productId === id) {
        const productStock = products.find((p: Product) => p.id === id)
        const quantity = sumAddQuantity(
          product.quantity,
          productStock?.stock,
          productStock?.stockType
        )
        return { ...product, quantity: quantity }
      }
      return product
    })
    setFieldValue('products', saleProducts)
  }

  const handleRemoveQuantity = (id: number) => {
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productId === id) {
        const productStock = products.find((p: Product) => p.id === id)
        const quantity = subRemoveQuantity(
          product.quantity,
          productStock?.stockType
        )

        return {
          ...product,
          quantity: quantity,
        }
      }
      return product
    })
    const product = saleProducts.find(
      (product: TSaleProduct) =>
        (typeof product.quantity === 'number'
          ? product.quantity
          : Number(product.quantity.split(',').join('.'))) === 0
    )
    if (product) {
      handleDellete(id)
      return
    }
    setFieldValue('products', saleProducts)
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="center">Quantidade</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="center">Remover</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: TProductSale) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.stockType}</TableCell>
              <TableCell
                align="center"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: '100%',
                }}
              >
                {row.stockType === 'UN' ? (
                  <AddRemoveQuantityUn
                    {...{ handleAddQuantity, handleRemoveQuantity, row }}
                  />
                ) : (
                  <AddRemoveQuantityKg {...{ row, handleChanceQuantity }} />
                )}
              </TableCell>
              <TableCell align="right">
                {row.salePrice.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
              <TableCell align="center">
                <button
                  onClick={() => handleDellete(row.id)}
                  style={{
                    cursor: 'pointer',
                    border: `1px solid ${theme.brown}`,
                    borderRadius: '0.5rem',
                  }}
                >
                  <DeleteIcon sx={{ color: theme.brown }} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
