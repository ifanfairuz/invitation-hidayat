import {
  createOrUpdateSession,
  deleteSession,
  findSession,
} from "@repo/session";
import nextSession, { SessionStore } from "next-session";

class Store implements SessionStore {
  async get(sid: string): Promise<SessionData | null | undefined> {
    try {
      const sess = await findSession(sid);
      if (sess) {
        const session = JSON.parse(sess.value, (key, value) => {
          if (key === "expires") return new Date(value);
          return value;
        }) as SessionData;
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
      await createOrUpdateSession(sid, { value: JSON.stringify(sess) });
    } catch (error) {
      console.error(error);
    }
  }

  async destroy(sid: string) {
    try {
      await deleteSession(sid);
    } catch (error) {
      console.error(error);
    }
  }

  async touch(sid: string, sess: SessionData) {
    try {
      await createOrUpdateSession(sid, { value: JSON.stringify(sess) });
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
