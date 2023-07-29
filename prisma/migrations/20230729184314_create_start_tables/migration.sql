-- CreateTable
CREATE TABLE "order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" DECIMAL NOT NULL,
    "freightValue" DECIMAL NOT NULL,
    "discount" DECIMAL NOT NULL,
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

-- CreateTable
CREATE TABLE "payment_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "store" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "ecommerceUrl" TEXT
);
