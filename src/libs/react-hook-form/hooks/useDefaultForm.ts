import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { ZodType, ZodTypeDef } from 'zod'

/**
 * useDefaultForm
 *
 * defaultValuesはPartial<FORM_TYPE> | undefinedとなっており、
 * 型の初期化が強制されないためdefaultValuesの型をオーバーライドしている
 *
 * unknown型を渡して、any型を潰している(unknown型にすることで、意図しないプロパティへのアクセスを潰している)
 * バリデーションスキーマの定義とフォームのプロパティの定義が一致していない場合に型エラーを発生させたいため定義している
 *
 * useFormについて
 * @see https://react-hook-form.com/api/useform
 */
export const useDefaultForm = <
  FORM_TYPE extends Record<string, unknown>,
  VALIDATION_SCHEMA extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >,
>(
  options: Omit<UseFormProps<FORM_TYPE>, 'resolver'> & {
    defaultValues: FORM_TYPE
  },
  validationSchema: VALIDATION_SCHEMA,
): UseFormReturn<FORM_TYPE> => {
  return useForm<FORM_TYPE>({
    mode: 'onTouched',
    ...options,
    resolver: zodResolver(validationSchema),
  })
}
