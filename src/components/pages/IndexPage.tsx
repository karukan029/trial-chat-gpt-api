import { FC, useState } from "react"
import { useDefaultForm } from "@/libs/react-hook-form/hooks/useDefaultForm"
import { SubmitHandler } from "react-hook-form"

import {
  PromptFormSchema,
  PromptFormValidationSchema,
  usePromptFormSchema,
} from "@/components/form/scheme/promptFormSchema"
import { PromptForm } from "../form/PromptForm"
import { useSendChatGpt } from "./useSendChatGpt"

export const IndexPage: FC = () => {
  const validationSchema = usePromptFormSchema()
  const formReturn = useDefaultForm<
    PromptFormSchema,
    PromptFormValidationSchema
  >(
    {
      defaultValues: {
        message: "",
      },
    },
    validationSchema
  )

  const [responseMessege, setResponseMessege] = useState("")
  const { mutate } = useSendChatGpt()

  const submitHandler: SubmitHandler<PromptFormSchema> = (values) => {
    mutate(
      { message: values.message },
      {
        onSuccess: async (data) => {
          if (data.ok) {
            const json = await data.json()
            console.log(json)
            setResponseMessege(json.message)
          }
        },
      }
    )
  }

  return (
    <>
      <h1>Next.js で作る初めての OpenAI アプリ</h1>
      <PromptForm useFormReturn={formReturn} submitHandler={submitHandler} />
      <h2>答え：</h2>
      <p data-testid="response-message">{responseMessege}</p>
    </>
  )
}
