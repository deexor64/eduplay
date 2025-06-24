/*
  Warnings:

  - A unique constraint covering the columns `[templateCode]` on the table `Templates` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Templates_templateCode_key" ON "Templates"("templateCode");
