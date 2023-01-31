/*
  Warnings:

  - You are about to drop the column `not` on the `Keep` table. All the data in the column will be lost.
  - Added the required column `note` to the `Keep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Keep" DROP COLUMN "not",
ADD COLUMN     "note" TEXT NOT NULL;
