/*
  Warnings:

  - The required column `id` was added to the `stsessions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stsessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ended_at" DATETIME NOT NULL,
    "sessionId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    CONSTRAINT "stsessions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stsessions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stsessions" ("ended_at", "sessionId", "studentId") SELECT "ended_at", "sessionId", "studentId" FROM "stsessions";
DROP TABLE "stsessions";
ALTER TABLE "new_stsessions" RENAME TO "stsessions";
CREATE UNIQUE INDEX "stsessions_sessionId_studentId_key" ON "stsessions"("sessionId", "studentId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
