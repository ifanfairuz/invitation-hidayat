-- CreateTable
CREATE TABLE "Tamu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "wa" VARCHAR(20) NOT NULL,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "invitationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tamu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tamu" ADD CONSTRAINT "Tamu_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "Invitation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
