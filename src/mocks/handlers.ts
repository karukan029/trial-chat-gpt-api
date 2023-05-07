import { rest } from "msw"

import { mockChatGpt } from "./resolvers/chatGpt"

export const handlers = [rest.post(mockChatGpt.path, mockChatGpt.post)]
