/*
  Warnings:

  - You are about to drop the `_downlikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_uplikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_downlikes" DROP CONSTRAINT "_downlikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_downlikes" DROP CONSTRAINT "_downlikes_B_fkey";

-- DropForeignKey
ALTER TABLE "_uplikes" DROP CONSTRAINT "_uplikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_uplikes" DROP CONSTRAINT "_uplikes_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "postId" INTEGER;

-- DropTable
DROP TABLE "_downlikes";

-- DropTable
DROP TABLE "_uplikes";

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
