import { Invitation, Tamu, User } from "@prisma/client";
import { CookieSerializeOptions } from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
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
  type SessionApiRequest = NextApiRequest & SessionRequest;
  type MiddlewareApiSession<T extends unknown = any> = Middleware<
    SessionApiRequest,
    ServerResponse<SessionApiRequest> & NextApiResponse<T>
  >;

  type UserSession = User & { invitation?: Invitation | null };
  type UserSSR = Omit<
    UserSession,
    "createdAt" | "updatedAt" | "password" | "salt" | "invitation"
  > & { invitation?: Omit<Invitation, "createdAt" | "updatedAt"> | null };

  type AuthApiRequest = SessionApiRequest & {
    user: UserSession | undefined | null;
  };
  type MiddlewareApiAuth<T extends unknown = any> = Middleware<
    AuthApiRequest,
    ServerResponse<AuthApiRequest> & NextApiResponse<T>
  >;
  type AuthApiHandler<
    T,
    R extends AuthApiRequest = AuthApiRequest
  > = NextConnect<R, NextApiResponse<T> & ServerResponse<R>> & {
    mustAuth: () => AuthApiHandler<T>;
    mustUnauth: () => AuthApiHandler<T>;
  };

  type AuthRequest = NextRequest &
    SessionRequest & { user: UserSession | undefined | null };

  type WithUserSSRProps<P extends Record<string, any>> = P & { user: UserSSR };
  type WithAuthedSSRCallback<P extends Record<string, any>> = (
    user: UserSSR,
    context: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<P>>;

  type WithUnauthedSSRCallback<P extends Record<string, any>> = (
    context?: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<P>>;

  type AuthedPage<P = {}, IP = P> = NextPage<WithUserSSRProps<P>, IP>;
  type UnauthedPage<P = {}, IP = P> = NextPage<P, IP>;
}
