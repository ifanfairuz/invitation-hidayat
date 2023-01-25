import crypto, { BinaryLike } from "crypto";
import { closeConnection, getConection } from "./connection";
import { User } from "@prisma/client";

export function getAllUser() {
  return getConection().user.findMany();
}

export function createUser(data: InsertAI<User>) {
  const salt = crypto.randomBytes(16).toString("hex");
  const password = crypto
    .pbkdf2Sync(data.password, salt, 1000, 64, "sha512")
    .toString("hex");
  return getConection().user.create({
    data: { ...data, password, salt } as any,
  });
}

export function findUserByUsername(username: User["username"]) {
  return getConection().user.findFirst({ where: { username } });
}

export function updateUserByUsername(
  username: User["username"],
  update: InsertAI<User>
) {
  return getConection().user.update({
    data: update as any,
    where: { username },
  });
}

export function deleteUser(username: User["username"]) {
  return getConection().user.delete({ where: { username } });
}

export function validatePassword(user: User, pass: BinaryLike) {
  const inputHash = crypto
    .pbkdf2Sync(pass, user.salt, 1000, 64, "sha512")
    .toString("hex");
  return user.password === inputHash;
}
