/**
 * chatGPT node.js liberary
 * @see https://github.com/openai/openai-node
 */
// import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

/**
 * role
 * user、assistant、systemのいずれかを指定
 * user：自分の発言
 * assitant：ChatGPTの発言
 * system：ChatGPTに全体的な指示を出す
 * 対話をするにはリクエストに"user"の発言だけではなく"assistant"との対話の履歴を含める必要がある
 *
 * 公式リファレンス
 * @see https://platform.openai.com/docs/api-reference/chat/create?lang=node.js
 */
const completion = async (message: string) =>
  await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    temperature: 0.9,
    max_tokens: 200,
  })

export const sendPromptMessege = async (message: string) => {
  const responseMessege = await (
    await completion(message)
  ).data.choices[0].message

  return responseMessege
}
