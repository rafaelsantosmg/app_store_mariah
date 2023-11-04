/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from '@/interfaces/Products'
import { DataContext } from '@/providers/DataProvider'
import theme from '@/theme'
import { TProductSale, TSaleProduct } from '@/types'
import {
  formateValueInputNumeric,
  formateValueInputNumericPrice,
  formatedCurrency,
} from '@/utils/formate-values'
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
import { ChangeEvent, Fragment, useContext, useEffect, useState } from 'react'
import TextFields from '../Inputs/TextFields'

function createData(
  id: number,
  code: string,
  name: string,
  stockType: string,
  quantity: string | number,
  stock: string | number,
  salePrice: number
): TProductSale {
  return { id, code, name, stockType, quantity, stock, salePrice }
}

function AddRemoveQuantityUn({ ...props }): JSX.Element {
  const { handleAddQuantity, handleRemoveQuantity, row } = props
  return (
    <Fragment>
      <button
        type="button"
        style={{
          cursor: 'pointer',
          border: `1px solid ${theme.brown}`,
          borderRadius: '0.5rem',
        }}
        onClick={() => handleRemoveQuantity(row.code)}
      >
        <RemoveIcon sx={{ color: theme.brown }} />
      </button>
      {row.quantity}
      <button
        type="button"
        style={{
          cursor: 'pointer',
          border: `1px solid ${theme.brown}`,
          borderRadius: '0.5rem',
        }}
        onClick={() => handleAddQuantity(row.code)}
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
        handleChanceQuantity(target.value, row.code)
      }
    />
  )
}

function ChangePrice({ ...props }): JSX.Element {
  const { row, price, handleChangePrice } = props

  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-end',
      }}
    >
      <label
        htmlFor="salePrice"
        style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginRight: '0.5rem',
        }}
      >
        R$
      </label>
      <input
        id="salePrice"
        name="salePrice"
        value={price}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          handleChangePrice(target.value, row.code)
        }
        style={{
          height: '2rem',
          textAlign: 'center',
          fontSize: '1rem',
          width: '5rem',
        }}
      />
    </div>
  )
}

export default function SaleTable(): JSX.Element {
  const { products, setSaleProducts, form } = useContext(DataContext)
  const { values, setFieldValue } = form
  const [price, setPrice] = useState('')

  const filteredProducts = values.products.map((product: TSaleProduct) => {
    const findProduct = products.find(
      (p: Product) => p.code === product.productCode
    )
    return {
      ...findProduct,
      salePrice:
        findProduct?.name === 'PRODUTOS FIADO' ? price : findProduct?.salePrice,
      quantity: product.quantity,
    }
  })

  useEffect(() => {
    setSaleProducts(filteredProducts)
  }, [values.products])

  const rows = filteredProducts.map((product: TProductSale) =>
    createData(
      product.id,
      product.code,
      product.name,
      product.stockType,
      product.quantity,
      product.stock,
      product.salePrice
    )
  )

  const handleDelete = (code: string) => {
    const saleProducts = values.products.filter(
      (product: TSaleProduct) => product.productCode !== code
    )
    setFieldValue('products', saleProducts)
  }

  const handleChanceQuantity = (value: string, code: string) => {
    const inputQuantity = formateValueInputNumeric(value)
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productCode === code) {
        const productStock = products.find((p: Product) => p.code === code) || {
          stock: 0,
        }
        if (Number(inputQuantity) > productStock.stock) {
          return {
            ...product,
            quantity: productStock.stock.toFixed(3),
          }
        }
        return {
          ...product,
          quantity: inputQuantity,
        }
      }
      return product
    })
    setFieldValue('products', saleProducts)
  }

  const sumAddQuantity = (
    productQuantity: string,
    productStock: string | number = 0,
    stockType: string = 'UN'
  ): number => {
    if (productQuantity === productStock) {
      return Number(productQuantity)
    }
    const sum = stockType === 'UN' ? 1 : 0.05
    return Number(productQuantity) + sum
  }

  const subRemoveQuantity = (
    productQuantity: string,
    stockType: string = 'UN'
  ): number => {
    const sub = stockType === 'UN' ? 1 : 0.05
    return Number(productQuantity) - sub
  }

  const handleAddQuantity = (code: string) => {
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productCode === code) {
        const productStock = products.find((p: Product) => p.code === code)
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

  const handleRemoveQuantity = (code: string) => {
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productCode === code) {
        const productStock = products.find((p: Product) => p.code === code)
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
      handleDelete(code)
      return
    }
    setFieldValue('products', saleProducts)
  }

  const handleChangePrice = (value: string, code: string) => {
    const inputQuantity = formateValueInputNumericPrice(value)
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productCode === code) {
        const index = filteredProducts.findIndex(
          (p: Product) => p.code === code
        )
        if (index === -1) {
          return product
        }
        setPrice(inputQuantity)
        return {
          ...product,
          quantity: product.quantity,
          productPrice: Number(inputQuantity),
        }
      }
      return product
    })
    setFieldValue('products', saleProducts)
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Cod</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="center">Quantidade</TableCell>
            <TableCell align="right">Estoque</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Remover</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row: TProductSale) => {
            return (
              <TableRow
                key={row.code}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.code}</TableCell>
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
                  {row.stockType === 'KG'
                    ? Number(row.stock).toFixed(3)
                    : row.stock}
                </TableCell>
                <TableCell align="right">
                  {row.name === 'PRODUTOS FIADO' ? (
                    <ChangePrice {...{ row, price, handleChangePrice }} />
                  ) : (
                    formatedCurrency(row.salePrice)
                  )}
                </TableCell>
                <TableCell align="center">
                  {formatedCurrency(
                    row.salePrice *
                      (typeof row.quantity === 'number'
                        ? row.quantity
                        : Number(row.quantity.split(',').join('.')))
                  )}
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => handleDelete(row.code)}
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
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
