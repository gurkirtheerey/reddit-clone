-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "subthreadId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subthreadId" INTEGER;

-- CreateTable
CREATE TABLE "Subthread" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("subthreadId") REFERENCES "Subthread"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("subthreadId") REFERENCES "Subthread"("id") ON DELETE SET NULL ON UPDATE CASCADE;
