-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "daily_sales_id" INTEGER;

-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "daily_sales_id" INTEGER;

-- CreateTable
CREATE TABLE "daily_sales" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cash_amount" DOUBLE PRECISION NOT NULL,
    "pix_amount" DOUBLE PRECISION NOT NULL,
    "credit_amount" DOUBLE PRECISION NOT NULL,
    "debit_amount" DOUBLE PRECISION NOT NULL,
    "total_amount" DOUBLE PRECISION NOT NULL,
    "total_discount" DOUBLE PRECISION NOT NULL,
    "total_profit" DOUBLE PRECISION NOT NULL,
    "total_sales" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "daily_sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_daily_sales_id_fkey" FOREIGN KEY ("daily_sales_id") REFERENCES "daily_sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_daily_sales_id_fkey" FOREIGN KEY ("daily_sales_id") REFERENCES "daily_sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
