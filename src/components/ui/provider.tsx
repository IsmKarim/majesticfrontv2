"use client"

import { ChakraProvider } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import { theme } from "@/theme"

export function Provider(props: ColorModeProviderProps) {
  return (
    <ColorModeProvider {...props} defaultTheme="light">
      <ChakraProvider value={theme}>
        {props.children}
      </ChakraProvider>
    </ColorModeProvider>
  )
}