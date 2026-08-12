-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Electronics', 'Books', 'Furniture', 'Clothing', 'Sports', 'Other');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "Category" NOT NULL DEFAULT 'Other';
