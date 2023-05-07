import { ResponseResolver, RestContext, RestRequest } from "msw"

import {
  SendChatGptParams,
  SendChatGptResponse,
  path,
} from "@/components/pages/useSendChatGpt"

const dummyResponseData = (text: string): SendChatGptResponse => {
  const responseMessage = "dummy message " + text
  return { message: responseMessage }
}

export const post: ResponseResolver<
  RestRequest<SendChatGptParams>,
  RestContext
> = async (req, res, ctx) => {
  const { message } = await req.json()

  return res(
    ctx.status(200),
    ctx.json<SendChatGptResponse>(dummyResponseData(message))
  )
}

export const mockChatGpt = {
  path,
  post,
}
