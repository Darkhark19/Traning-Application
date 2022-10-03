/*
  Warnings:

  - Added the required column `courseId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "sessions_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("id") SELECT "id" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
CREATE TABLE "new_students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT,
    CONSTRAINT "students_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_students" ("content", "created_at", "id", "subject") SELECT "content", "created_at", "id", "subject" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
