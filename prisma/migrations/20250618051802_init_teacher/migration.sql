-- CreateTable
CREATE TABLE "Teacher" (
    "teacherID" TEXT NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("teacherID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_indexNumber_key" ON "Teacher"("indexNumber");
