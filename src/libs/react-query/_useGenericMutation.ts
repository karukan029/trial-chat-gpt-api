import { UseMutationOptions, useMutation } from "@tanstack/react-query"

export const useGenericMutation = <TVariables, TData, TContext>(
  fetcher: (params: TVariables, token: string) => Promise<TData | void>,
  options?: UseMutationOptions<TData | void, unknown, TVariables, TContext>
) => {
  // const { accessToken } = useAuthGuardContext()

  return useMutation(
    async (params: TVariables) => {
      // return await fetcher(params, accessToken || "")
    },
    { ...options }
  )
}
