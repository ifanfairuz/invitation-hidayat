import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

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

const prisma = new PrismaClient();

async function main() {
  const salt = crypto.randomBytes(16).toString("hex");
  const password = createHashPassword("hidayat", salt);
  const user = await prisma.user.create({
    data: { username: "hidayat", name: "Hidayat", password, salt } as any,
  });
  await prisma.invitation.create({
    data: {
      title: "Undangan Keluarga Bpk.Hidayat/Ibu.Wati",
      userId: user.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
