export const textStyles = {
  menu: {
    description: "Menu item text",
    value: {
      fontFamily: "{fonts.body}",
      color: {base : "{colors.secondary.500}" , _dark: "{colors.neutral.white}"},
      fontSize: "{fontSizes.sm}",       
      fontWeight: "600",
      lineHeight: "{lineHeights.short}",
      letterSpacing: "{letterSpacings.normal}",
      textTransform: "none",
    },
     navMenu: {
    description: "Top navigation menu",
    value: {
      fontFamily: "{fonts.body}",
      fontWeight: "{fontWeights.semibold}",
      lineHeight: "{lineHeights.short}",
      letterSpacing: "{letterSpacings.wide}",
      textTransform: "uppercase",
      fontSize: {
        base: "{fontSizes.sm}",  
        md:   "{fontSizes.md}",  
      },
    },
  }
  },
}