import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    fontWeight: "semibold",
    borderRadius: "0",
    transition: "all 0.15s ease-out", 
    boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
    border: "2.5px solid transparent",

    _hover: {
      boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
      borderColor: "secondary.500",
      borderWidth: "2.5px",
      color : "black" , 
      bgColor : "#F5F5F5"
    },
    _active: {
      transform: "scale(0.97) translateY(1px)",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "accent.500",
      outlineOffset: "2px",
    },
    _disabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "brand.500",
        color: "white",
        _hover: { bg: "primary.600" },
        _active: { bg: "primary.700" },
      },
      secondary: {
        bg: "secondary.500",
        color: "neutral.900",
        _hover: { bg: "neutral.200" },
        _active: { bg: "neutral.300" },
      },
      ghost: {
        bg: "secondary.50",
        color: "secondary.500",
        _hover: { bg: "secondary.100" },
        _active: { bg: "secondary.200" },
      },
      secondaryGradient: {
        bgGradient:
          "linear-gradient(184.76deg, #926F84 -1.34%, #674459 100%)",
        color: "tierce.100",
        _hover: { opacity: 0.9 },
        _active: { opacity: 0.8 },
      },
      outline: {
        border: "2px solid",
        borderColor: "primary.500",
        color: "primary.500",
        _hover: { bg: "primary.50" },
        _active: { bg: "primary.100" },
      },
    },
    size: {
      sm: { px: 3, py: 1, textStyle: "sm" },
      md: { px: 4, py: 2, textStyle: "md" },
      lg: { px: 6, py: 3, textStyle: "lg" },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
