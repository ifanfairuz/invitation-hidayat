import { authedHandler } from "@lib/auth";

export default authedHandler()
  .mustAuth()
  .post(async (req, res) => {
    try {
      await req.session.destroy();
      req.user = undefined;
      res.json("OK");
    } catch (err) {
      res.status(500).json(err);
    }
  });
