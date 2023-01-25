import { findUserByUsername, validatePassword } from "@repo/user";
import { Passport } from "passport";
import { Strategy } from "passport-local";

const passport = new Passport();
passport.serializeUser<string>(function (user: any, done) {
  done(null, user.username);
});
passport.deserializeUser<string, any>(function (req, id, done) {
  const user = findUserByUsername(id);
  done(null, user);
});

passport.use(
  new Strategy((username, password, done) =>
    findUserByUsername(username)
      .then((user) => {
        if (!user || !validatePassword(user, password)) {
          done(null, undefined);
        } else {
          done(null, user);
        }
      })
      .catch(() => {
        done(null, undefined);
      })
  )
);

export default passport;
