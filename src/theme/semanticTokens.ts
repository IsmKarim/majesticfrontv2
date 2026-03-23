
// src/theme/tokens/semantic-tokens.ts
export const semanticTokens = {
  colors: {
    // Backgrounds
    bg: {
      canvas: {
        value: {
          base: "{colors.tierce.50}",     // app body
          _dark: "{colors.neutral.black}",// dark body
        },
      },
      accent : {
        value: {
          base : "{colors.brand.main}", 
          _dark: "{colors.neutral.black}",  // highlighted sections
        }

      },
      surface: {
        value: {
          base: "{colors.neutral.white}", // cards / panels
          _dark: "{colors.neutral.darkGrey}",
        },
      },
      muted: {
        value: {
          base: "{colors.neutral.100}",   // subtle fills
          _dark: "{colors.neutral.800}",
        },
      },
      subtle: {
        value: {
          base: "{colors.neutral.50}",
          _dark: "{colors.neutral.700}",
        },
      },
      elevated: {
        value: {
          base: "{colors.neutral.white}", // elevated layers (menus, modals)
          _dark: "{colors.neutral.800}",
        },
      },
      gradientSecondary : { value: "{gradiants.secondary.value}"}
    },

    // Foregrounds (text/icons)
    fg: {
      default: {
        value: {
          base: "{colors.neutral.black}", // primary text
          _dark: "{colors.neutral.white}",
        },
      },
      muted: {
        value: {
          base: "{colors.neutral.600}",   // secondary text
          _dark: "{colors.neutral.400}",
        },
      },
      subtle: {
        value: {
          base: "{colors.neutral.500}",   // tertiary text
          _dark: "{colors.neutral.500}",
        },
      },
      inverted: {
        value: {
          base: "{colors.neutral.white}", // text on dark bg
          _dark: "{colors.neutral.black}",
        },
      },
      onEmphasis: {
        value: {
          base: "{colors.neutral.white}", // text on brand
          _dark: "{colors.neutral.black}",
        },
      },
    },

    // Borders
    border: {
      default: {
        value: {
          base: "{colors.neutral.200}",
          _dark: "{colors.neutral.700}",
        },
      },
      muted: {
        value: {
          base: "{colors.neutral.100}",
          _dark: "{colors.neutral.800}",
        },
      },
    },

    // Brand
    brand: {
      default: { value: "{colors.brand.600}" },
      emphasis: { value: "{colors.brand.700}" },
      subtle: {
        value: {
          base: "{colors.brand.50}",
          _dark: "{colors.brand.900}",
        },
      },
    },

    // Status
    success: {
      default: { value: "{colors.green.600}" },
      emphasis: { value: "{colors.green.700}" },
      subtle: {
        value: {
          base: "{colors.green.50}",
          _dark: "{colors.green.900}",
        },
      },
    },
    error: {
      default: { value: "{colors.red.600}" },
      emphasis: { value: "{colors.red.700}" },
      subtle: {
        value: {
          base: "{colors.red.50}",
          _dark: "{colors.red.900}",
        },
      },
    },
    warning: {
      default: { value: "{colors.orange.600}" },
      emphasis: { value: "{colors.orange.700}" },
      subtle: {
        value: {
          base: "{colors.orange.50}",
          _dark: "{colors.orange.900}",
        },
      },
    },
    info: {
      default: { value: "{colors.blue.600}" },
      emphasis: { value: "{colors.blue.700}" },
      subtle: {
        value: {
          base: "{colors.blue.50}",
          _dark: "{colors.blue.900}",
        },
      },
    },
  },

  // Typography semantics (optional, maps directly to your font tokens)
  typography: {
    body: {
      font: { value: "{fonts.body}" },
      size: { value: "{fontSizes.md}" },
      lineHeight: { value: "{lineHeights.normal}" },
      letterSpacing: { value: "{letterSpacings.normal}" },
    },
    heading: {
      font: { value: "{fonts.heading}" },
      lineHeight: { value: "{lineHeights.tight}" },
      letterSpacing: { value: "{letterSpacings.tight}" },
    },
    menu: {
      font: { value: "{fonts.body}" },
      size: {
        value: {
          base: "{fontSizes.sm}",
          md: "{fontSizes.md}",
          lg: "{fontSizes.lg}",
        },
      },
      lineHeight: { value: "{lineHeights.short}" },
      letterSpacing: { value: "{letterSpacings.normal}" },
    },
  },


  assets : {
      logo: {
        value: { type: "url", value: "/static/logo.png" },
      }
    }
} as const
