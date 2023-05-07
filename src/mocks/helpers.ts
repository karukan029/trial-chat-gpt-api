import { PathParams, ResponseResolver, RestContext, RestRequest } from "msw"

type ErrorResolverArgs = {
  status?: number
  message?: string
  code?: number
}

export const errorResolvers = {
  ["500"]:
    ({
      status = 500,
      message = "Internal Server Error",
      code = 500,
    }: ErrorResolverArgs = {}): ResponseResolver<
      RestRequest<never, PathParams<string>>,
      RestContext
    > =>
    (_req, res, ctx) => {
      return res(
        ctx.status(status),
        ctx.json({
          message,
          code,
        })
      )
    },
  ["400"]:
    ({
      status = 400,
      message = "Invalid Parameter",
      code = 400,
    }: ErrorResolverArgs = {}): ResponseResolver<
      RestRequest<never, PathParams<string>>,
      RestContext
    > =>
    (_req, res, ctx) => {
      return res(
        ctx.status(status),
        ctx.json({
          message,
          code,
        })
      )
    },
}
