-- CreateEnum
CREATE TYPE "Language" AS ENUM ('C_PLUS_PLUS', 'JAVA', 'JAVASCRIPT', 'PYTHON');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeSnippet" (
    "id" SERIAL NOT NULL,
    "language" "Language" NOT NULL,
    "stdin" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,

    CONSTRAINT "CodeSnippet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "CodeSnippet" ADD CONSTRAINT "CodeSnippet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
