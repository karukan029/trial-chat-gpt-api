import { useMutation } from "@tanstack/react-query"

export type SendChatGptParams = {
  message: string
}

export type SendChatGptResponse = {
  message: string
}

export const path = "/api/chat-gpt"

export const useSendChatGpt = () => {
  return useMutation((params: SendChatGptParams) =>
    fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params),
    })
  )
}
