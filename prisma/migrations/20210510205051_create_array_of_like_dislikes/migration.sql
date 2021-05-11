/*
  Warnings:

  - You are about to drop the column `likes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "_uplikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_downlikes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_uplikes_AB_unique" ON "_uplikes"("A", "B");

-- CreateIndex
CREATE INDEX "_uplikes_B_index" ON "_uplikes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_downlikes_AB_unique" ON "_downlikes"("A", "B");

-- CreateIndex
CREATE INDEX "_downlikes_B_index" ON "_downlikes"("B");

-- AddForeignKey
ALTER TABLE "_uplikes" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_uplikes" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downlikes" ADD FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_downlikes" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
