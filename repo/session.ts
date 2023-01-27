import { ConnectionDB, getConection } from "./connection";
import { PrismaClient, Session } from "@prisma/client";

const getAllSessionReal = (con: ConnectionDB) =>
  getConection().session.findMany();
const createSessionReal = (con: ConnectionDB, data: InsertAI<Session, "sid">) =>
  getConection().session.create({ data: data as any });
const createOrUpdateSessionReal = (
  con: ConnectionDB,
  sid: Session["sid"],
  data: InsertAI<Session, "sid">
) =>
  getConection().session.upsert({
    create: { sid, ...data },
    update: { ...data },
    where: { sid },
  });
const findSessionReal = (con: ConnectionDB, sid: Session["sid"]) =>
  getConection().session.findFirst({ where: { sid } });
const updateSessionReal = (
  con: ConnectionDB,
  sid: Session["sid"],
  update: InsertAI<Session, "sid">
) =>
  getConection().session.update({
    data: update as any,
    where: { sid },
  });
const deleteSessionReal = (con: ConnectionDB, sid: Session["sid"]) =>
  getConection().session.delete({ where: { sid } });

type PWithoutConnection<T extends (...args: any) => any> = T extends (
  con: ConnectionDB,
  ...args: infer P
) => any
  ? P
  : never;
export const getAllSession = () => getAllSessionReal(getConection());
export const createSession = (
  ...args: PWithoutConnection<typeof createSessionReal>
) => createSessionReal(getConection(), ...args);
export const createOrUpdateSession = (
  ...args: PWithoutConnection<typeof createOrUpdateSessionReal>
) => createOrUpdateSessionReal(getConection(), ...args);
export const findSession = (
  ...args: PWithoutConnection<typeof findSessionReal>
) => findSessionReal(getConection(), ...args);
export const updateSession = (
  ...args: PWithoutConnection<typeof updateSessionReal>
) => updateSessionReal(getConection(), ...args);
export const deleteSession = (
  ...args: PWithoutConnection<typeof deleteSessionReal>
) => deleteSessionReal(getConection(), ...args);

export class SessionRepo {
  private connection: ConnectionDB;

  constructor(connection?: ConnectionDB) {
    this.connection = connection || new PrismaClient();
  }

  getAll() {
    return getAllSessionReal(this.connection);
  }

  create(...args: Parameters<typeof createSession>) {
    return createSessionReal(this.connection, ...args);
  }

  createOrUpdate(...args: Parameters<typeof createOrUpdateSession>) {
    return createOrUpdateSessionReal(this.connection, ...args);
  }

  find(...args: Parameters<typeof findSession>) {
    return findSessionReal(this.connection, ...args);
  }

  update(...args: Parameters<typeof updateSession>) {
    return updateSessionReal(this.connection, ...args);
  }

  delete(...args: Parameters<typeof deleteSession>) {
    return deleteSessionReal(this.connection, ...args);
  }

  static deleteExpired(user?: Session["user"]) {
    const con = new PrismaClient();
    return con.session
      .deleteMany({
        where: {
          expiredAt: {
            lt: new Date(),
          },
          ...(user ? { user } : {}),
        },
      })
      .finally(() => {
        con.$disconnect();
      });
  }
}
