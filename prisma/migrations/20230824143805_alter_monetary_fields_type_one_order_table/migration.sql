/*
  Warnings:

  - You are about to alter the column `discount` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `freightValue` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `total` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" REAL NOT NULL,
    "freightValue" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "origin" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "paidAt" DATETIME,
    "deletedAt" DATETIME,
    "paymentTypeId" INTEGER NOT NULL,
    "orderStatusId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    CONSTRAINT "order_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "payment_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "order_status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "store" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order" ("createdAt", "deletedAt", "discount", "freightValue", "id", "orderStatusId", "origin", "paidAt", "paymentTypeId", "storeId", "total", "updatedAt") SELECT "createdAt", "deletedAt", "discount", "freightValue", "id", "orderStatusId", "origin", "paidAt", "paymentTypeId", "storeId", "total", "updatedAt" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE INDEX "order_paymentTypeId_idx" ON "order"("paymentTypeId");
CREATE INDEX "order_orderStatusId_idx" ON "order"("orderStatusId");
CREATE INDEX "order_storeId_idx" ON "order"("storeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
