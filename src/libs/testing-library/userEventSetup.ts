import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/**
 * userEventのsetup関数のラッパー
 * イベントを発火するテストを実行する際に利用
 * @see {@link https://testing-library.com/docs/user-event/intro/#writing-tests-with-userevent}
 */
export const userEventSetup = (
  jsx: JSX.Element,
  options: Parameters<(typeof userEvent)['setup']>[0] = {},
) => {
  return {
    user: userEvent.setup({
      ...options,
    }),
    ...render(jsx),
  }
}
