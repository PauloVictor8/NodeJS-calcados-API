-- DropIndex
DROP INDEX "User_registration_key";

-- AlterTable
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("registration");
