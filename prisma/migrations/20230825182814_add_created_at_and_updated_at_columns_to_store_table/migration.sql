/*
  Warnings:

  - Added the required column `updatedAt` to the `store` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ecommerceUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_store" ("ecommerceUrl", "id", "name") SELECT "ecommerceUrl", "id", "name" FROM "store";
DROP TABLE "store";
ALTER TABLE "new_store" RENAME TO "store";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
