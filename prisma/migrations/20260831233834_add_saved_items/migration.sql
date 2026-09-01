-- CreateTable
CREATE TABLE "SavedItems" (
    "saved_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedItems_pkey" PRIMARY KEY ("saved_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SavedItems_user_id_product_id_key" ON "SavedItems"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "SavedItems" ADD CONSTRAINT "SavedItems_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItems" ADD CONSTRAINT "SavedItems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
