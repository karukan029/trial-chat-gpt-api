import type { NextApiRequest, NextApiResponse } from "next"
import { sendPromptMessege } from "@/libs/chatGPT"

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const promptMessage = req.body.message

  if (typeof promptMessage !== "string") {
    res.status(400).end()
    return
  }

  const responseMessage = await sendPromptMessege(promptMessage)
  res.status(200).json({
    message: responseMessage?.content ?? "",
  })
}
