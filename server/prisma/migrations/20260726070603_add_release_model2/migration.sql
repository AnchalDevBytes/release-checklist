/*
  Warnings:

  - You are about to drop the column `steps` on the `Release` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Release" DROP COLUMN "steps";

-- CreateTable
CREATE TABLE "ReleaseStep" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "releaseId" INTEGER NOT NULL,

    CONSTRAINT "ReleaseStep_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReleaseStep" ADD CONSTRAINT "ReleaseStep_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "Release"("id") ON DELETE CASCADE ON UPDATE CASCADE;
