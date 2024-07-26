/*
  Warnings:

  - You are about to drop the column `clerkId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerk_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerk_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_clerkId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "clerkId",
ADD COLUMN     "clerk_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "nodes" TEXT,
    "edges" TEXT,
    "name" TEXT NOT NULL,
    "flow_path" TEXT,
    "cron_path" TEXT,
    "publish" BOOLEAN DEFAULT false,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_clerk_id_key" ON "users"("clerk_id");

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("clerk_id") ON DELETE RESTRICT ON UPDATE CASCADE;
