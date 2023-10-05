/*
  Warnings:

  - You are about to drop the `Payments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sales` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_salesId_fkey";

-- DropForeignKey
ALTER TABLE "_ProductsToSales" DROP CONSTRAINT "_ProductsToSales_B_fkey";

-- DropTable
DROP TABLE "Payments";

-- DropTable
DROP TABLE "Sales";

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "method" TEXT,
    "installment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salesId" INTEGER,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discont" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "sales_price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "paymentsId" INTEGER,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSales" ADD CONSTRAINT "_ProductsToSales_B_fkey" FOREIGN KEY ("B") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
