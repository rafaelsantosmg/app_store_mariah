/*
  Warnings:

  - You are about to drop the column `movement_date` on the `daily_movements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "daily_movements" DROP COLUMN "movement_date",
ALTER COLUMN "opening_balance" DROP NOT NULL,
ALTER COLUMN "closing_balance" DROP NOT NULL;
