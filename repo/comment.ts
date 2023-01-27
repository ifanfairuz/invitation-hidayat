import { Comment } from "@prisma/client";
import { getConection } from "./connection";

export const getAllComment = (onlyshow: boolean = true) => {
  let where = onlyshow ? { show: true } : {};
  return getConection().comment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};
export const createComment = (data: InsertAI<Comment>) => {
  return getConection().comment.create({ data });
};
export const updateComment = (id: number, data: UpdateAI<Comment>) => {
  return getConection().comment.update({ data, where: { id } });
};
export const deleteComment = (id: number) => {
  return getConection().comment.delete({ where: { id } });
};
