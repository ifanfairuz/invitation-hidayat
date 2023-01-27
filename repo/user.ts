import crypto from "crypto";
import { getConection } from "./connection";
import { User } from "@prisma/client";

export function createHashPassword(password: string, salt?: string) {
  return crypto
    .pbkdf2Sync(
      password,
      salt || crypto.randomBytes(16).toString("hex"),
      1000,
      64,
      "sha512"
    )
    .toString("hex");
}

export function getAllUser() {
  return getConection().user.findMany();
}

export function createUser(data: InsertAI<User>) {
  const salt = crypto.randomBytes(16).toString("hex");
  const password = createHashPassword(data.password, salt);
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

export function validatePassword(user: User, pass: string) {
  return user.password === createHashPassword(pass, user.salt);
}
