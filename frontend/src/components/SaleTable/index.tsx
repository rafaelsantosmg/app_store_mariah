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
      onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(parseFloat(target.value))) {
          handleChanceQuantity(target.value, row.code)
        } else handleChanceQuantity('', row.code)
      }}
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
        onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
          if (!isNaN(parseFloat(target.value))) {
            handleChangePrice(target.value, row.code)
          }
        }}
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
        findProduct?.name === 'DIVERSOS' ? price : findProduct?.salePrice,
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

  const handleDellete = (code: string) => {
    const saleProducts = values.products.filter(
      (product: TSaleProduct) => product.productCode !== code
    )
    setFieldValue('products', saleProducts)
  }

  const handleChanceQuantity = (value: string, code: string) => {
    const inputValue = value.replace(',', '.')
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productCode === code) {
        const productStock = products.find((p: Product) => p.code === code) || {
          stock: 0,
        }
        if (Number(value) * 1000 > productStock.stock) {
          return {
            ...product,
            quantity: parseFloat((productStock.stock / 1000).toFixed(3)),
          }
        } else {
          let newValue
          if (inputValue?.toString().includes('.')) {
            newValue =
              inputValue.toString().split('.')[1].length > 3
                ? inputValue.toString().split('.')[0] +
                  '.' +
                  inputValue.toString().split('.')[1].slice(0, 3)
                : inputValue
          } else newValue = inputValue
          const quantity =
            Number(newValue) * 1000 > productStock.stock
              ? (productStock.stock / 1000).toFixed(3)
              : newValue
          console.log(quantity)
          return { ...product, quantity }
        }
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
      handleDellete(code)
      return
    }
    setFieldValue('products', saleProducts)
  }

  const handleChangePrice = (value: string, code: string) => {
    const saleProducts = values.products.map((product: TSaleProduct) => {
      if (product.productCode === code) {
        const index = filteredProducts.findIndex(
          (p: Product) => p.code === code
        )
        if (index === -1) {
          return product
        }
        setPrice(
          value.split('.').length > 1
            ? value.split('.')[0] + '.' + value.split('.')[1].slice(0, 2)
            : value
        )
        return {
          ...product,
          quantity: product.quantity,
          productPrice: Number(Number(value).toFixed(2)),
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
                <TableCell>{row.stock}</TableCell>
                <TableCell align="right">
                  {row.name === 'DIVERSOS' ? (
                    <ChangePrice {...{ row, price, handleChangePrice }} />
                  ) : (
                    row.salePrice.toLocaleString('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  )}
                </TableCell>
                <TableCell align="center">
                  {(
                    row.salePrice *
                    (typeof row.quantity === 'number'
                      ? row.quantity
                      : Number(row.quantity.split(',').join('.')))
                  ).toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => handleDellete(row.code)}
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
