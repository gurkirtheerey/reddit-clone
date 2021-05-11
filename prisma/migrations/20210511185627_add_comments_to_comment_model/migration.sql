-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
