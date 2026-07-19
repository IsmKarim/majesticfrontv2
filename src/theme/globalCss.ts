export const globalCss = {
  // map Chakra reset -> your font variables (you already did this)
  ":where(:root, :host)": {
    "--global-font-body": "var(--font-montseratt), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    "--global-font-heading": "var(--font-montseratt), ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  },

  html: {
    scrollBehavior: "smooth",
  },

  "@media (prefers-reduced-motion: reduce)": {
    html: { scrollBehavior: "auto" },
  },

  "html, body": {
    m: 0,
    p: 0,
    maxWidth: "100vw",
    overflowX: "hidden",
    bg: { base: "{colors.bg.canvas}", _dark: "{colors.bg.canvas}" },
    color: { base: "{colors.fg.default}", _dark: "{colors.fg.default}" },
    fontFamily: "{fonts.body}",
    lineHeight: "{lineHeights.normal}",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    // Mobile: no grey flash on tap, no font inflation in landscape
    WebkitTapHighlightColor: "transparent",
    WebkitTextSizeAdjust: "100%",
  },

  // Headings: responsive by default (devs don’t set fontSize)
  h1: {
    fontFamily: "{fonts.heading}",
    fontWeight: "700",
    lineHeight: "{lineHeights.tight}",
    letterSpacing: "{letterSpacings.tight}",
    fontSize: {
      base: "{fontSizes.3xl}", // ~30
      md:   "{fontSizes.4xl}", // ~36
      lg:   "{fontSizes.5xl}", // ~48
    },
  },
  h2: {
    fontFamily: "{fonts.heading}",
    fontWeight: "700",
    lineHeight: "{lineHeights.tight}",
    letterSpacing: "{letterSpacings.tight}",
    fontSize: {
      base: "{fontSizes.2xl}", // 24
      md:   "{fontSizes.3xl}", // 30
      lg:   "{fontSizes.4xl}", // 36
    },
  },
  h3: {
    fontFamily: "{fonts.heading}",
    fontWeight: "600",
    lineHeight: "{lineHeights.snug}",
    fontSize: {
      base: "{fontSizes.xl}",  // 20
      md:   "{fontSizes.2xl}", // 24
      lg:   "{fontSizes.3xl}", // 30
    },
  },
  h4: {
    fontFamily: "{fonts.heading}",
    fontWeight: "600",
    lineHeight: "{lineHeights.snug}",
    fontSize: {
      base: "{fontSizes.lg}",  // 18
      md:   "{fontSizes.xl}",  // 20
      lg:   "{fontSizes.2xl}", // 24
    },
  },
  h5: {
    fontFamily: "{fonts.heading}",
    fontWeight: "600",
    lineHeight: "{lineHeights.snug}",
    fontSize: {
      base: "{fontSizes.md}",  // 16
      md:   "{fontSizes.lg}",  // 18
    },
  },
  h6: {
    fontFamily: "{fonts.heading}",
    fontWeight: "600",
    lineHeight: "{lineHeights.snug}",
    fontSize: {
      base: "{fontSizes.sm}",  // 14
      md:   "{fontSizes.md}",  // 16
    },
  },

  // Paragraphs: responsive baseline for body copy
  p: {
    fontFamily: "{fonts.body}",
    lineHeight: "{lineHeights.relaxed}",
    fontSize: {
      base: "{fontSizes.md}", // 16
      md:   "{fontSizes.lg}", // 18
    },
  },

  // Small / caption
  small: {
    fontFamily: "{fonts.body}",
    lineHeight: "{lineHeights.normal}",
    fontSize: "{fontSizes.sm}", // 14
  },
}