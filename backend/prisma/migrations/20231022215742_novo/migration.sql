/*
  Warnings:

  - You are about to drop the `_DailyPayments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DailyPayments" DROP CONSTRAINT "_DailyPayments_A_fkey";

-- DropForeignKey
ALTER TABLE "_DailyPayments" DROP CONSTRAINT "_DailyPayments_B_fkey";

-- DropTable
DROP TABLE "_DailyPayments";
