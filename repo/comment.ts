import { Comment } from "@prisma/client";
import { closeConnection, getConection } from "./connection";

export const getAllComment = (onlyshow: boolean = true) => {
  let where = onlyshow ? { show: true } : {};
  return getConection()
    .comment.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })
    .finally(closeConnection);
};
export const createComment = (data: InsertAI<Comment>) => {
  return getConection().comment.create({ data }).finally(closeConnection);
};
export const updateComment = (id: number, data: UpdateAI<Comment>) => {
  return getConection()
    .comment.update({ data, where: { id } })
    .finally(closeConnection);
};
export const deleteComment = (id: number) => {
  return getConection()
    .comment.delete({ where: { id } })
    .finally(closeConnection);
};
