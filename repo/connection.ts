import { PrismaClient } from "@prisma/client";
import { IncomingMessage, ServerResponse } from "http";
import { Middleware } from "next-connect";

var prisma: PrismaClient | undefined;
export const getConection = () => (prisma = prisma || new PrismaClient());
export const closeConnection = () => !!prisma && prisma.$disconnect();

export const middlewareDB: Middleware<
  IncomingMessage,
  ServerResponse<IncomingMessage>
> = (req, res, next) => {
  res.on("finish", () => {
    closeConnection();
  });
  next();
};
