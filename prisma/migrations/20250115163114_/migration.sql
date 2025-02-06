/*
  Warnings:

  - Made the column `phone` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `numberOfPeople` on table `Deal` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specialInstructions` on table `Deal` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT,
    "streetAddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT
);
INSERT INTO "new_Customer" ("avatar", "city", "email", "firstName", "id", "lastName", "phone", "state", "streetAddress", "zipCode") SELECT "avatar", "city", "email", "firstName", "id", "lastName", "phone", "state", "streetAddress", "zipCode" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
CREATE TABLE "new_Deal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "streetAddress" TEXT,
    "avatar" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "roomArea" REAL,
    "numberOfPeople" INTEGER NOT NULL,
    "appointmentDate" DATETIME NOT NULL,
    "specialInstructions" TEXT NOT NULL,
    "roomAccess" TEXT,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Deal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Deal" ("appointmentDate", "avatar", "city", "customerId", "id", "numberOfPeople", "price", "roomAccess", "roomArea", "specialInstructions", "state", "status", "streetAddress", "zipCode") SELECT "appointmentDate", "avatar", "city", "customerId", "id", "numberOfPeople", "price", "roomAccess", "roomArea", "specialInstructions", "state", "status", "streetAddress", "zipCode" FROM "Deal";
DROP TABLE "Deal";
ALTER TABLE "new_Deal" RENAME TO "Deal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
