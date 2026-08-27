"use client"

import type { ButtonProps } from "@chakra-ui/react"
import { IconButton as ChakraIconButton } from "@chakra-ui/react"
import * as React from "react"
import { LuX } from "react-icons/lu"
import { useTranslations } from "next-intl"

export type CloseButtonProps = ButtonProps

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  const t = useTranslations("common")
  return (
    <ChakraIconButton variant="ghost" aria-label={t("close")} ref={ref} {...props}>
      {props.children ?? <LuX />}
    </ChakraIconButton>
  )
})
