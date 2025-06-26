/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `UploadSession` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coverImage` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "coverImageUrl",
ADD COLUMN     "coverImage" TEXT NOT NULL;

-- DropTable
DROP TABLE "UploadSession";
