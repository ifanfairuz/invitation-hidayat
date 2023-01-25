import { User } from "@prisma/client";
import { CookieSerializeOptions } from "cookie";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiHandler, NextApiRequest } from "next";
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

  type AuthApiRequest = NextApiHandler &
    SessionRequest & { user: User | undefined | null };
  type AuthApiHandler<T> = NextConnect<NextApiRequest, NextApiResponse<T>>;

  type AuthRequest = NextRequest &
    SessionRequest & { user: User | undefined | null };
}
