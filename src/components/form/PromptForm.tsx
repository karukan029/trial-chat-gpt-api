import { FC } from "react"
import { SubmitHandler, UseFormReturn } from "react-hook-form"

import { PromptFormSchema } from "@/components/form/scheme/promptFormSchema"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type PromptFormProps = {
  useFormReturn: UseFormReturn<PromptFormSchema>
  submitHandler: SubmitHandler<PromptFormSchema>
}

export const PromptForm: FC<PromptFormProps> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = props.useFormReturn

  return (
    <>
      <h2>質問：</h2>
      <form onSubmit={handleSubmit(props.submitHandler)}>
        <Label htmlFor="promptMessage">Prompt:</Label>
        <Textarea
          id="promptMessage"
          placeholder="質問してください"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="leading-7">{errors.message.message}</p>
        )}
        <Button type="submit">質問する</Button>
      </form>
    </>
  )
}
