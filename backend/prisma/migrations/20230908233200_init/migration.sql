-- DropForeignKey
ALTER TABLE "Sales" DROP CONSTRAINT "Sales_paymentsId_fkey";

-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "salesId" INTEGER;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "Sales"("id") ON DELETE SET NULL ON UPDATE CASCADE;
