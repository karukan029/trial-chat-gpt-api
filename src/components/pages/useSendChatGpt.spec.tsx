import { renderHook } from "@/libs/testing-library/testUtils"
import { errorResolvers } from "@/mocks/helpers"
import { mockChatGpt } from "@/mocks/resolvers/chatGpt"
import { server } from "@/mocks/server"
import { act, waitFor } from "@testing-library/react"
import { rest } from "msw"

import { useSendChatGpt } from "./useSendChatGpt"

describe("useSendChatGpt", () => {
  test("ChatGPT APIを呼び出せる", async () => {
    const requestMessage = "test"

    const { result } = renderHook(() => useSendChatGpt())

    act(() => {
      result.current.mutate({ message: requestMessage })
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.status).toBe(200)
    expect(await result.current.data?.json()).toStrictEqual({
      message: "dummy message " + requestMessage,
    })
  }),
    test("ChatGPT APIがBad Requestを返す場合", async () => {
      // エラーレスポンスを返すように設定
      server.use(rest.post(mockChatGpt.path, errorResolvers[400]()))

      const requestMessage = "test"

      const { result } = renderHook(() => useSendChatGpt())

      act(() => {
        result.current.mutate({ message: requestMessage })
      })

      await waitFor(() => expect(result.current.isSuccess).toBe(true))

      expect(result.current.isError).toBe(false)
      expect(result.current.data?.status).toBe(400)
      expect(await result.current.data?.json()).toStrictEqual({
        code: 400,
        message: "Invalid Parameter",
      })
    })
})
