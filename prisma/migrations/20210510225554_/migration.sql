/*
  Warnings:

  - You are about to drop the `_downLikes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_upLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_downLikes" DROP CONSTRAINT "_downLikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_downLikes" DROP CONSTRAINT "_downLikes_B_fkey";

-- DropForeignKey
ALTER TABLE "_upLikes" DROP CONSTRAINT "_upLikes_A_fkey";

-- DropForeignKey
ALTER TABLE "_upLikes" DROP CONSTRAINT "_upLikes_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "upLikesFrom" INTEGER[],
ADD COLUMN     "downLikesFrom" INTEGER[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "upLikedPosts" INTEGER[],
ADD COLUMN     "downLikedPosts" INTEGER[];

-- DropTable
DROP TABLE "_downLikes";

-- DropTable
DROP TABLE "_upLikes";
