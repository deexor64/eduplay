/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Student` table. All the data in the column will be lost.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED');

-- AlterEnum
ALTER TYPE "TeacherRole" ADD VALUE 'DEMONSTRATOR';

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "coverImageUrl";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phoneNumber" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "StudentRole";
