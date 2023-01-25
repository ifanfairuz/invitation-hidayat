import nextConnect from "next-connect";
import { middlewareDB } from "@repo/connection";
import session from "./_session";
import passport from "./_passport";
import { GetServerSideProps } from "next";
import { IncomingMessage, ServerResponse } from "http";
import { User } from "@prisma/client";

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

export const authed: GetServerSideProps = async ({ req, res }) => {
  const user = await userSSR(req, res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }

  return { props: { user } };
};
export const unauthed: GetServerSideProps = async ({ req, res }) => {
  const user = await userSSR(req, res);
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }

  return { props: {} };
};
