import { getConection } from "./connection";
import { Session } from "@prisma/client";

export function getAllSession() {
  return getConection().session.findMany();
}

export function createSession(data: InsertAI<Session, "sid">) {
  return getConection().session.create({ data: data as any });
}
export function createOrUpdateSession(
  sid: Session["sid"],
  data: InsertAI<Session, "sid">
) {
  return getConection().session.upsert({
    create: { sid, ...data },
    update: { ...data },
    where: { sid },
  });
}

export function findSession(sid: Session["sid"]) {
  return getConection().session.findFirst({ where: { sid } });
}

export function updateSession(
  sid: Session["sid"],
  update: InsertAI<Session, "sid">
) {
  return getConection().session.update({
    data: update as any,
    where: { sid },
  });
}

export function deleteSession(sid: Session["sid"]) {
  return getConection().session.delete({ where: { sid } });
}
