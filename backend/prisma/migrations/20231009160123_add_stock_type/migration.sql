/*
  Warnings:

  - Added the required column `stock_type` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products"
ADD COLUMN "stock_type" TEXT NOT NULL DEFAULT 'UN';

-- Altera o tipo de dados da coluna "stock" para DOUBLE PRECISION
ALTER TABLE "products"
ALTER COLUMN "stock" SET DATA TYPE DOUBLE PRECISION;