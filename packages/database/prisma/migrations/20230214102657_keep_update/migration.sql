-- AlterTable
ALTER TABLE "Keep" ALTER COLUMN "note" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "todo" TEXT NOT NULL,
    "keepId" INTEGER NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TagToKeep" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TagToKeep_AB_unique" ON "_TagToKeep"("A", "B");

-- CreateIndex
CREATE INDEX "_TagToKeep_B_index" ON "_TagToKeep"("B");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_keepId_fkey" FOREIGN KEY ("keepId") REFERENCES "Keep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToKeep" ADD CONSTRAINT "_TagToKeep_A_fkey" FOREIGN KEY ("A") REFERENCES "Keep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TagToKeep" ADD CONSTRAINT "_TagToKeep_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
