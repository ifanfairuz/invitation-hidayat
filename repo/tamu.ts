import { Tamu } from "@prisma/client";
import { closeConnection, getConection } from "./connection";
import { translatePhone } from "@support/string";

export const nameToUsername: (text: string) => Promise<string> = (text) => {
  const slug = text
    .toString()
    .toLowerCase()
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .replace(/\s+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/[^\w\-]+/g, "");
  return getTamuByUsername(slug).then<string>((user) =>
    !!user ? nameToUsername(slug + Math.random()) : slug
  );
};

export const getAllTamu = () =>
  getConection().tamu.findMany().finally(closeConnection);

export const getTamu = (id: number) =>
  getConection().tamu.findFirst({ where: { id } }).finally(closeConnection);
export const getTamuByUsername = (username: string) =>
  getConection()
    .tamu.findFirst({ where: { username } })
    .finally(closeConnection);

export const createTamu = async (data: InsertAI<Tamu, "id" | "username">) => {
  return nameToUsername(data.name).then((username) => {
    return getConection()
      .tamu.create({
        data: {
          ...data,
          wa: translatePhone(data.wa),
          username,
        },
      })
      .finally(closeConnection);
  });
};

export const updateTamu = (
  id: number,
  update: UpdateAI<Tamu, "id" | "username">
) => {
  let data = update;
  if (data.wa) data.wa = translatePhone(data.wa);
  return getConection()
    .tamu.update({ data, where: { id } })
    .finally(closeConnection);
};

export const deleteTamu = (id: number) =>
  getConection().tamu.delete({ where: { id } }).finally(closeConnection);
