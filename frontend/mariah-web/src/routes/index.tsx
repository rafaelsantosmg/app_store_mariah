import React from "react"
import { Route, Routes as Switch } from "react-router-dom"
import { HomePage } from "../pages/home"
import { ProductsPage } from "../pages/products"
import { SalesPage } from "../pages/sales"

export const Routes: React.FC = (): JSX.Element => {
  return (
    <Switch>
      <Route index element={<HomePage />} />
      <Route path="sales" element={<SalesPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Switch>
  )
}