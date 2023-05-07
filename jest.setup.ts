// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom"
import "whatwg-fetch"
import { server } from "./src/mocks/server"

// テストのタイムアウト時間を設定
// デフォルトは5000ms
// jest.setTimeout(30000)

// Establish API mocking before all tests.
beforeAll(() => server.listen())
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())
