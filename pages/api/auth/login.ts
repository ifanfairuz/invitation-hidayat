import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  token?: string;
  expired_at?: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  if (req.method === "POST") {
    const { body } = req;
    if (body.email && body.password) {
      res.status(401).json({ message: "Email atau Password Salah." });
      return;
    }
    res.status(401).json({ message: "Email atau Password Salah." });
  } else {
    res.status(404).json("NotFound.");
  }
}
