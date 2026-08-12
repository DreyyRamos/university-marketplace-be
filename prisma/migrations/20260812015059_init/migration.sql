/*
  Warnings:

  - The values [LIKE_NEW,STILL_USABLE] on the enum `Condition` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Condition_new" AS ENUM ('NEW', 'GOOD', 'USABLE');
ALTER TABLE "Product" ALTER COLUMN "condition" TYPE "Condition_new" USING ("condition"::text::"Condition_new");
ALTER TYPE "Condition" RENAME TO "Condition_old";
ALTER TYPE "Condition_new" RENAME TO "Condition";
DROP TYPE "public"."Condition_old";
COMMIT;
