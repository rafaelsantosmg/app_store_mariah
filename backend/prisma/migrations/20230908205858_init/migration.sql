/*
  Warnings:

  - You are about to drop the column `sales_id` on the `products` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_sales_id_fkey";

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "products_id" INTEGER;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "sales_id";

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_products_id_fkey" FOREIGN KEY ("products_id") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
