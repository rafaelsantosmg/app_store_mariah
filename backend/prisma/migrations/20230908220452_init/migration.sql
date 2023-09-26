/*
  Warnings:

  - You are about to drop the column `products_id` on the `Sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_products_id_fkey";

-- AlterTable
ALTER TABLE "Sales" DROP COLUMN "products_id";

-- CreateTable
CREATE TABLE "_ProductsToSales" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToSales_AB_unique" ON "_ProductsToSales"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToSales_B_index" ON "_ProductsToSales"("B");

-- AddForeignKey
ALTER TABLE "_ProductsToSales" ADD CONSTRAINT "_ProductsToSales_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSales" ADD CONSTRAINT "_ProductsToSales_B_fkey" FOREIGN KEY ("B") REFERENCES "Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
