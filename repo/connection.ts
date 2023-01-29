import { PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";
import { Middleware } from "next-connect";

let prisma: PrismaClient | undefined;
export const getConection = () => {
  if (prisma) return prisma;
  prisma = new PrismaClient();
  return prisma;
};
export const closeConnection = async () => {
  if (prisma) {
    await prisma.$disconnect();
    prisma = undefined;
  }
};

export const middlewareDB: Middleware<
  IncomingMessage,
  ServerResponse<IncomingMessage>
> = (req, res, next) => {
  res.once("finish", () => {
    closeConnection();
  });
  next();
};

export type ConnectionDB = ReturnType<typeof getConection>;
