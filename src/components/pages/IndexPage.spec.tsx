import { render } from "@/libs/testing-library/testUtils"
import { act, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { IndexPage } from "./IndexPage"

describe("IndexPage", () => {
  test("初期表示", async () => {
    // ページコンポーネントを描画
    render(<IndexPage />)

    const elements = screen.getByTestId("response-message")
    // screen.debug(elements)
    expect(elements.textContent).toBe("")
  })
  test("質問を送信、結果を表示できる", async () => {
    const user = userEvent.setup()

    // ページコンポーネントを描画
    render(<IndexPage />)

    // フォームに入力
    const inputContents = "test"
    const input = screen.getByRole("textbox")
    await user.type(input, inputContents)

    await act(async () => {
      // 送信ボタンをクリック
      const submitButton = screen.getByRole("button", { name: "質問する" })
      await user.click(submitButton)
    })

    // レスポンスが表示されるまで待機
    await waitFor(() => {
      const elements = screen.getByTestId("response-message")
      // screen.debug(elements)
      expect(elements.textContent).toBe("dummy message " + inputContents)
    })
  })
})

describe("メッセージが必須のバリデーションエラーになる", () => {
  test("メッセージ$messageValue", async () => {
    const user = userEvent.setup()

    // ページコンポーネントを描画
    render(<IndexPage />)

    await act(async () => {
      // 送信ボタンをクリック
      const submitButton = screen.getByRole("button", { name: "質問する" })
      await user.click(submitButton)
    })

    // レスポンスが表示されるまで待機
    await waitFor(() => {
      screen.getByText("1文字以上入力してください")
    })
  })
})

describe("メッセージが最大値のバリデーションエラーになる", () => {
  test.each`
    messageValue
    ${"a".repeat(201)}
  `("メッセージ$messageValue", async ({ messageValue }) => {
    const user = userEvent.setup()

    // ページコンポーネントを描画
    render(<IndexPage />)

    // フォームに入力
    const input = screen.getByRole("textbox")
    await user.type(input, messageValue)

    await act(async () => {
      // 送信ボタンをクリック
      const submitButton = screen.getByRole("button", { name: "質問する" })
      await user.click(submitButton)
    })

    // レスポンスが表示されるまで待機
    await waitFor(() => {
      screen.getByText("200文字以内で入力してください")
    })
  })
})

describe("メッセージが入力できる", () => {
  test.each`
    messageValue
    ${"a"}
    ${"a".repeat(200)}
  `("メッセージ$messageValue", async ({ messageValue }) => {
    const user = userEvent.setup()

    // ページコンポーネントを描画
    render(<IndexPage />)

    // フォームに入力
    const input = screen.getByRole("textbox")
    await user.type(input, messageValue)

    await act(async () => {
      // 送信ボタンをクリック
      const submitButton = screen.getByRole("button", { name: "質問する" })
      await user.click(submitButton)
    })

    // レスポンスが表示されるまで待機
    await waitFor(() => {
      const elements = screen.getByTestId("response-message")
      expect(elements.textContent).toBe("dummy message " + messageValue)
    })
  })
})
