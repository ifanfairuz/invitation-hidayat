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

export const authedHandler: <T>() => AuthApiHandler<T> = () =>
  nextConnect().use(authConnect);
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
        const { createdAt, updatedAt, password, salt, ...data } = user;
        return data;
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
