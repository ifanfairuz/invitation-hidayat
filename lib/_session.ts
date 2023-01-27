import { SessionRepo } from "@repo/session";
import nextSession, { SessionStore } from "next-session";

class Store implements SessionStore {
  repo: SessionRepo;

  constructor() {
    this.repo = new SessionRepo();
  }

  async get(sid: string): Promise<SessionData | null | undefined> {
    try {
      const sess = await this.repo.find(sid);
      if (sess) {
        const session = JSON.parse(
          sess.value?.toString() || "{}",
          (key, value) => {
            if (key === "expires") return new Date(value);
            return value;
          }
        ) as SessionData;
        if (
          session.cookie.expires &&
          session.cookie.expires.getTime() <= Date.now()
        ) {
          await this.destroy(sid);
          return null;
        }
        return session;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async set(sid: string, sess: SessionData) {
    try {
      await this.repo.createOrUpdate(sid, {
        value: JSON.stringify(sess),
        expiredAt: sess.cookie.expires || null,
        user: sess.passport.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async destroy(sid: string) {
    try {
      const sess = await this.repo.find(sid);
      SessionRepo.deleteExpired(sess?.user);

      await this.repo.delete(sid);
    } catch (error) {
      console.error(error);
    }
  }

  async touch(sid: string, sess: SessionData) {
    try {
      await this.repo.createOrUpdate(sid, {
        value: JSON.stringify(sess),
        expiredAt: sess.cookie.expires || null,
        user: sess.passport.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

const store = new Store();
export const getSession = nextSession({
  name: "sess",
  autoCommit: true,
  store: store,
  cookie: {
    maxAge: 60 * 60 * 8,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  },
});
const session: MiddlewareApiSession = async (req, res, next) => {
  await getSession(req, res);
  next();
};

export default session;
