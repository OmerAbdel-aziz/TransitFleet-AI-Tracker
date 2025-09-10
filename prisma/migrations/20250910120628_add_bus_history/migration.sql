/*
  Warnings:

  - The primary key for the `BusHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `eta` to the `BusHistory` table without a default value. This is not possible if the table is not empty.
  - Made the column `delay` on table `BusHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."BusHistory" DROP CONSTRAINT "BusHistory_pkey",
ADD COLUMN     "eta" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "delay" SET NOT NULL,
ADD CONSTRAINT "BusHistory_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BusHistory_id_seq";
