import { FC, ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from "@testing-library/react"

import { queryClient } from "../react-query"

type AllProvidersProps = {
  children: ReactNode
}

const AllProviders: FC<AllProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options })

export { customRender as render }

const customRenderHook = <Result, Props>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props>
) => renderHook(render, { wrapper: AllProviders, ...options })

export { customRenderHook as renderHook }
