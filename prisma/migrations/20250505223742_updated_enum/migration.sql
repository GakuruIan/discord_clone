/*
  Warnings:

  - The values [VOICE] on the enum `ChannelType` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[invitecode]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ChannelType_new" AS ENUM ('TEXT', 'VIDEO', 'AUDIO');
ALTER TABLE "Channel" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Channel" ALTER COLUMN "type" TYPE "ChannelType_new" USING ("type"::text::"ChannelType_new");
ALTER TYPE "ChannelType" RENAME TO "ChannelType_old";
ALTER TYPE "ChannelType_new" RENAME TO "ChannelType";
DROP TYPE "ChannelType_old";
ALTER TABLE "Channel" ALTER COLUMN "type" SET DEFAULT 'TEXT';
COMMIT;

-- CreateIndex
CREATE UNIQUE INDEX "Server_invitecode_key" ON "Server"("invitecode");
