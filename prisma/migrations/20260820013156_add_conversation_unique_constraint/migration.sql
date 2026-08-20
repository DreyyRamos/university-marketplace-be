/*
  Warnings:

  - A unique constraint covering the columns `[product_id,buyer_id,seller_id]` on the table `Conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conversation_product_id_buyer_id_seller_id_key" ON "Conversation"("product_id", "buyer_id", "seller_id");
