/*
  Warnings:

  - Added the required column `username` to the `Tamu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tamu" ADD COLUMN     "username" VARCHAR(255) NOT NULL;
