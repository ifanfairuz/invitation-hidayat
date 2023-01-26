import { Tamu, User } from "@prisma/client";
import { CookieSerializeOptions } from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  NextApiRequest,
  NextPage,
} from "next";
import { Middleware, NextConnect } from "next-connect";
import {
  Session,
  SessionData as SessData,
  SessionRecord,
} from "next-session/lib/types";
import { NextRequest } from "next/server";
declare global {
  type SessionData = SessData<SessionRecord>;
  type SessionRequest = IncomingMessage & {
    session: Session<SessionData>;
  };
  type MiddlewareSession = Middleware<
    SessionRequest,
    ServerResponse<SessionRequest>
  >;

  type UserSSR = Omit<User, "createdAt" | "updatedAt" | "password" | "salt">;

  type AuthApiRequest = NextApiHandler &
    SessionRequest & { user: User | undefined | null };
  type AuthApiHandler<T> = NextConnect<NextApiRequest, NextApiResponse<T>>;

  type AuthRequest = NextRequest &
    SessionRequest & { user: User | undefined | null };

  type WithUserSSRProps<P extends Record<string, any>> = P & { user: UserSSR };
  type WithAuthedSSRCallback<P extends Record<string, any>> = (
    user?: UserSSR,
    context?: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<P>>;

  type WithUnauthedSSRCallback<P extends Record<string, any>> = (
    context?: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<P>>;

  type AuthedPage<P = {}, IP = P> = NextPage<WithUserSSRProps<P>, IP>;
  type UnauthedPage<P = {}, IP = P> = NextPage<P, IP>;
}
