import nextConnect from "next-connect";
import { closeConnection, middlewareDB } from "@repo/connection";
import session from "./_session";
import passport from "./_passport";
import { GetServerSideProps } from "next";
import { IncomingMessage, ServerResponse } from "http";

export const authConnect = nextConnect()
  .use(middlewareDB)
  .use(session)
  .use(passport.initialize())
  .use(passport.session());

const mustAuth: MiddlewareApiAuth = (req, res, next) => {
  if (req.user) return next();
  return res.json("Unauthorized.");
};
const mustUnauth: MiddlewareApiAuth = (req, res, next) => {
  if (!req.user) return next();
  return res.json("Unauthorized.");
};

export function authedHandler<T>(): AuthApiHandler<T> {
  const handler = nextConnect().use(authConnect) as any;
  handler.mustAuth = function () {
    return this.use(mustAuth);
  };
  handler.mustUnauth = function () {
    return this.use(mustUnauth);
  };
  return handler as AuthApiHandler<T>;
}

const userSSR = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  return authConnect
    .run(req, res)
    .then(() => req as AuthRequest)
    .then((r) => r.user)
    .then((user) => {
      if (user) {
        const {
          createdAt,
          updatedAt,
          password,
          salt,
          invitation: iData,
          ...data
        } = user;
        const { createdAt: ca, updatedAt: ua, ...invitation } = iData || {};
        return { ...data, invitation } as UserSSR;
      }
      return undefined;
    });
};

export function withAuthedSSR<P extends Record<string, any>>(
  cb?: WithAuthedSSRCallback<P>
): GetServerSideProps<WithUserSSRProps<P>> {
  return async (context) => {
    const user = await userSSR(context.req, context.res);
    if (!user) {
      closeConnection();
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }

    const res = !cb ? { props: {} as P } : await cb(user, context);
    closeConnection();
    return {
      ...res,
      props: {
        user,
        ...("props" in res ? res.props : {}),
      } as WithUserSSRProps<P>,
    };
  };
}
export function withUnauthedSSR<P extends Record<string, any>>(
  cb?: WithUnauthedSSRCallback<P>
): GetServerSideProps<P> {
  return async (context) => {
    const user = await userSSR(context.req, context.res);
    if (user) {
      closeConnection();
      return {
        redirect: {
          permanent: false,
          destination: "/dashboard",
        },
      };
    }

    const res = !cb ? { props: {} as P } : await cb(context);
    closeConnection();
    return res;
  };
}

export const authed: GetServerSideProps = withAuthedSSR();
export const unauthed: GetServerSideProps = withUnauthedSSR();
