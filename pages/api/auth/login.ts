import { authedHandler } from "@lib/auth";
import passport from "@lib/_passport";

export default authedHandler<any>().post(
  passport.authenticate("local"),
  (req: AuthRequest, res) => {
    if (req.user) {
      res.json({ message: "OK" });
    } else {
      res.status(401).json({ message: "Email atau Password Salah." });
    }
  }
);
