import { authedHandler } from "@lib/auth";
import { Tamu } from "@prisma/client";
import { createTamu, deleteTamu, updateTamu } from "@repo/tamu";

type InsertParam = Pick<Tamu, "name" | "alamat" | "wa">;
type UpdateParam = Pick<Tamu, "name" | "alamat" | "wa" | "id">;
type DeleteParam = Pick<Tamu, "id">;
type InsertRes = { message: string };
type UpdateRes = { message: string; data: Tamu };
type Res = InsertRes | UpdateRes;

export default authedHandler<Res>()
  .mustAuth()
  .post(async (req, res) => {
    try {
      const data: InsertParam = req.body;
      await createTamu({
        ...data,
        sent: false,
        invitationId: req.user?.invitation?.id || 0,
      });
      res.json({ message: "OK" });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  })
  .put(async (req, res) => {
    try {
      const data: UpdateParam = req.body;
      const result = await updateTamu(data.id, data);
      res.json({ message: "OK", data: result });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  })
  .delete(async (req, res) => {
    try {
      const data: DeleteParam = req.body;
      await deleteTamu(data.id);
      res.json({ message: "OK" });
    } catch (error) {
      res.status(500).json({ message: String(error) });
    }
  });
