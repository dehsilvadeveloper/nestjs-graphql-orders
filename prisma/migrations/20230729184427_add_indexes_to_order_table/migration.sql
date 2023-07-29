-- CreateIndex
CREATE INDEX "order_paymentTypeId_idx" ON "order"("paymentTypeId");

-- CreateIndex
CREATE INDEX "order_orderStatusId_idx" ON "order"("orderStatusId");

-- CreateIndex
CREATE INDEX "order_storeId_idx" ON "order"("storeId");
