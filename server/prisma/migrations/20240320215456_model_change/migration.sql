/*
  Warnings:

  - You are about to drop the `CodeSnippet` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `language` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stdInput` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CodeSnippet" DROP CONSTRAINT "CodeSnippet_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "language" "Language" NOT NULL,
ADD COLUMN     "sourceCode" TEXT NOT NULL,
ADD COLUMN     "stdInput" TEXT NOT NULL;

-- DropTable
DROP TABLE "CodeSnippet";
