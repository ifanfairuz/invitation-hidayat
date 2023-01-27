import { PrismaClient } from "@prisma/client";
import { createUser } from "@repo/user";

const prisma = new PrismaClient();

async function main() {
  const user = await createUser({
    username: "hidayat",
    password: "hidayat",
    name: "Hidayat",
    salt: "",
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
