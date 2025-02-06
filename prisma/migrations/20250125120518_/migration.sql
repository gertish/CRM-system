/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    CONSTRAINT "Deal_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Deal" ("appointmentDate", "avatar", "city", "customerId", "id", "numberOfPeople", "price", "roomAccess", "roomArea", "specialInstructions", "state", "status", "streetAddress", "zipCode") SELECT "appointmentDate", "avatar", "city", "customerId", "id", "numberOfPeople", "price", "roomAccess", "roomArea", "specialInstructions", "state", "status", "streetAddress", "zipCode" FROM "Deal";
DROP TABLE "Deal";
ALTER TABLE "new_Deal" RENAME TO "Deal";
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_Task" ("description", "dueDate", "id", "status") SELECT "description", "dueDate", "id", "status" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
