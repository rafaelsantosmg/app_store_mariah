/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import DeleteIcon from '@mui/icons-material/Delete'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DataContext } from '@/providers/DataProvider'
import { TProduct, TProductSale, TSaleProduct } from '@/types'
import { Product } from '@/interfaces/Products'

function createData(
  id: number,
  name: string,
  description: string,
  quantity: number,
  price: number
): TProductSale {
  return { id, name, description, quantity, price }
}

export default function SaleTable({ ...props }) {
  const { products, setSaleProducts } = useContext(DataContext)
  const { form } = props
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
      product.description,
      product.quantity,
      product.price
    )
  )

  const handleDellete = (id: number) => {
    const products = values.products.filter(
      (product: TSaleProduct) => product.productId !== id
    )
    setFieldValue('products', products)
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Descrição</TableCell>
            <TableCell align="right">Quantidade</TableCell>
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
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">
                {row.price.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </TableCell>
              <TableCell align="center">
                <button
                  onClick={() => handleDellete(row.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <DeleteIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
