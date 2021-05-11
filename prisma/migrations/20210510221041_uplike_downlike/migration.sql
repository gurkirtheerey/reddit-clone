/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_postId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "postId";

-- CreateTable
CREATE TABLE "_upLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_downLikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_upLikes_AB_unique" ON "_upLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_upLikes_B_index" ON "_upLikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_downLikes_AB_unique" ON "_downLikes"("A", "B");

-- CreateIndex
CREATE INDEX "_downLikes_B_index" ON "_downLikes"("B");

-- AddForeignKey
ALTER TABLE "_upLikes" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upLikes" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downLikes" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downLikes" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
