/*
  Warnings:

  - You are about to drop the column `payment_id` on the `sales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sales" DROP COLUMN "payment_id";

-- CreateTable
CREATE TABLE "daily_movements" (
    "id" SERIAL NOT NULL,
    "movement_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "opening_balance" DOUBLE PRECISION NOT NULL,
    "closing_balance" DOUBLE PRECISION NOT NULL,
    "total_sales" DOUBLE PRECISION NOT NULL,
    "cash_sales" DOUBLE PRECISION NOT NULL,
    "pix_sales" DOUBLE PRECISION NOT NULL,
    "debit_card_sales" DOUBLE PRECISION NOT NULL,
    "credit_card_sales_cash" DOUBLE PRECISION NOT NULL,
    "credit_card_sales_installment" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DailyPayments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DailyPayments_AB_unique" ON "_DailyPayments"("A", "B");

-- CreateIndex
CREATE INDEX "_DailyPayments_B_index" ON "_DailyPayments"("B");

-- AddForeignKey
ALTER TABLE "_DailyPayments" ADD CONSTRAINT "_DailyPayments_A_fkey" FOREIGN KEY ("A") REFERENCES "daily_movements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DailyPayments" ADD CONSTRAINT "_DailyPayments_B_fkey" FOREIGN KEY ("B") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `movement_date` on the `daily_movements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "daily_movements" DROP COLUMN "movement_date",
ALTER COLUMN "opening_balance" DROP NOT NULL,
ALTER COLUMN "closing_balance" DROP NOT NULL;