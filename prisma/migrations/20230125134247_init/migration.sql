/*
  Warnings:

  - Added the required column `alamat` to the `Tamu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tamu" ADD COLUMN     "alamat" VARCHAR(255) NOT NULL;
