import { Cormorant_Garamond, Fraunces,  Montserrat,  Poppins } from "next/font/google";

export const cormorant_garamond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export const display = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT','WONK','opsz'],
  variable: '--font-display',
  style: ['normal'],
  weight: 'variable',
});

export const fonts = {
  body: { value: "var(--font-cormorant_garamond), system-ui, sans-serif" },
  heading: { value: "var(--font-cormorant_garamond), system-ui, sans-serif" },
  mono: { value: "Menlo, monospace" },
};

export const fontSizes = {
  "2xs" : { value: "0.625rem" }, // 10
  xs:  { value: "0.75rem"  }, // 12
  sm:  { value: "0.875rem" }, // 14
  md:  { value: "1rem"     }, // 16
  lg:  { value: "1.125rem" }, // 18
  xl:  { value: "1.25rem"  }, // 20
  "2xl": { value: "1.5rem"   }, // 24
  "3xl": { value: "1.875rem" }, // 30
  "4xl": { value: "2.25rem"  }, // 36
  "5xl": { value: "3rem"     }, // 48
  "6xl": { value: "3.75rem"  }, // 60
}

export const lineHeights = {
  tight:   { value: "1.2" },
  snug:    { value: "1.3" },
  normal:  { value: "1.5" },
  relaxed: { value: "1.625" },
}

export const letterSpacings = {
  tight: { value: "-0.02em" },
  normal:{ value: "0" },
  wide:  { value: "0.02em" },
}

export const typography = {
  fonts,
  fontSizes,
  lineHeights,
  letterSpacings,
}

