/*
  Warnings:

  - You are about to drop the column `discont` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `paymentsId` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the `_ProductsToSales` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `discount` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ProductsToSales" DROP CONSTRAINT "_ProductsToSales_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductsToSales" DROP CONSTRAINT "_ProductsToSales_B_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "discont",
DROP COLUMN "paymentsId",
DROP COLUMN "quantity",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "payment_id" INTEGER;

-- DropTable
DROP TABLE "_ProductsToSales";

-- CreateTable
CREATE TABLE "sales_products" (
    "id" SERIAL NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "sales_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales_products" ADD CONSTRAINT "sales_products_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_products" ADD CONSTRAINT "sales_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
