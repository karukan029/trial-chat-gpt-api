import * as z from "zod"

export const usePromptFormSchema = () => {
  return z.object({
    message: z
      .string()
      .min(1, { message: "1文字以上入力してください" })
      .max(200, { message: "200文字以内で入力してください" }),
  })
}

/**
 *
 * ReturnTypeについて
 * @see https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype
 */
export type PromptFormValidationSchema = ReturnType<typeof usePromptFormSchema>
export type PromptFormSchema = z.infer<PromptFormValidationSchema>
