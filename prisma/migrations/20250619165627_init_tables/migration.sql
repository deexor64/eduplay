-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "indexNumber" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "Student" (
    "studentID" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "fullName" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(20) NOT NULL,
    "password" TEXT NOT NULL,
    "indexNumber" VARCHAR(20) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_indexNumber_key" ON "User"("indexNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Student_indexNumber_key" ON "Student"("indexNumber");
