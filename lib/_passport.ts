import { findUserByUsername, validatePassword } from "@repo/user";
import { Passport } from "passport";
import { Strategy } from "passport-local";

const getUserSession = (username: string, password?: string) => {
  const res = findUserByUsername(username);
  return res
    .then((user) => {
      if (!user || (!!password && !validatePassword(user, password))) {
        return Promise.reject("Unauthorized.");
      } else {
        return user;
      }
    })
    .then(async (user) => {
      if (user) {
        const invitation = await res
          .invitations()
          .then((invitations) => invitations?.[0] || null)
          .catch(() => null);
        return { ...user, invitation } as UserSession;
      }
      return Promise.reject("Unauthorized.");
    })
    .catch(() => {
      return Promise.reject("Unauthorized.");
    });
};

const passport = new Passport();
passport.serializeUser<string>(async (user: any, done) => {
  done(null, user.username);
});
passport.deserializeUser<string, any>(async (req, username, done) => {
  getUserSession(username)
    .then((session) => done(null, session))
    .catch((err) => done(err, false));
});

passport.use(
  new Strategy((username, password, done) => {
    return getUserSession(username, password)
      .then((session) => done(null, session))
      .catch((err) => done(err, false));
  })
);

export default passport;
