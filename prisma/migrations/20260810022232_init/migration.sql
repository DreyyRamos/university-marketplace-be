/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_image` to the `User` table without a default value. This is not possible if the table is not empty.
  - The required column `user_id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_rating` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('LIKE_NEW', 'GOOD', 'STILL_USABLE');

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "profile_image" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL,
ADD COLUMN     "user_rating" INTEGER NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_price" INTEGER NOT NULL,
    "product_image" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_details" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "condition" "Condition" NOT NULL,
    "location" TEXT NOT NULL,
    "seller_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
