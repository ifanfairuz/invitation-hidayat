import { Comment } from "@prisma/client";
import {
  createComment,
  deleteComment,
  getAllComment,
  updateComment,
} from "@repo/comment";
import { middlewareDB } from "@repo/connection";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

type InsertParam = Pick<Comment, "name" | "text">;
type UpdateParam = Pick<Comment, "show" | "id">;
type DeleteParam = Pick<Comment, "id">;
type GetRes = { message: string; datas: Comment[] };
type InsertRes = { message: string };
type UpdateRes = { message: string; data: Comment };
type Res = GetRes | InsertRes | UpdateRes;

export default nextConnect<NextApiRequest, NextApiResponse<Res>>()
  .use(middlewareDB)
  .get(async (req, res) => {
    try {
      const comments = await getAllComment();
      res.json({ message: "OK", datas: comments });
    } catch (error) {
      res.status(500).json({ message: String(error), datas: [] });
    }
  })
  .post(async (req, res) => {
    try {
      const data: InsertParam = req.body;
      const comment = await createComment({
        ...data,
        name: data.name || "Tanpa Nama",
        show: true,
        invitationId: 1,
      });
      res.json({ message: "OK", data: comment });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  })
  .put(async (req, res) => {
    try {
      const { show, id }: UpdateParam = req.body;
      const comment = await updateComment(id, { show });
      res.json({ message: "OK", data: comment });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  })
  .delete(async (req, res) => {
    try {
      const data: DeleteParam = req.body;
      await deleteComment(data.id);
      res.json({ message: "OK" });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  });
