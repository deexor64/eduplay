/*
  Warnings:

  - Added the required column `progressOf` to the `Progress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Progress" ADD COLUMN     "progressOf" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_progressOf_fkey" FOREIGN KEY ("progressOf") REFERENCES "Activity"("activityID") ON DELETE RESTRICT ON UPDATE CASCADE;
