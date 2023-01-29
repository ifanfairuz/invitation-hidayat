import { User } from "@prisma/client";
import { closeConnection, getConection } from "./connection";

export const getUserDefaultInvitation = (userId: User["id"]) => {
  return getConection()
    .invitation.findFirst({ where: { userId } })
    .finally(closeConnection);
};
