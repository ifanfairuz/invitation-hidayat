import { Tamu } from "@prisma/client";
import { getConection } from "./connection";
import { nameToUsername, translatePhone } from "@support/string";

export const getAllTamu = () => getConection().tamu.findMany();

export const getTamu = (id: number) =>
  getConection().tamu.findFirst({ where: { id } });
export const getTamuByUsername = (username: string) =>
  getConection().tamu.findFirst({ where: { username } });

export const createTamu = (data: InsertAI<Tamu, "id" | "username">) =>
  getConection().tamu.create({
    data: {
      ...data,
      wa: translatePhone(data.wa),
      username: nameToUsername(data.name),
    },
  });

export const updateTamu = (
  id: number,
  update: UpdateAI<Tamu, "id" | "username">
) => {
  let data = update;
  if (data.wa) data.wa = translatePhone(data.wa);
  return getConection().tamu.update({ data, where: { id } });
};

export const deleteTamu = (id: number) =>
  getConection().tamu.delete({ where: { id } });
