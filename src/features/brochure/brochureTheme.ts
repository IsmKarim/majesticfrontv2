import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import { Font } from "@react-pdf/renderer";

/**
 * Mirrors the Chakra tokens in `src/theme/colors.ts`. `@react-pdf` runs outside
 * the Chakra runtime and cannot resolve `brand.700`-style tokens, so the handful
 * the brochure uses are restated here as literals. Keep them in step with the
 * theme if the palette moves.
 */
export const palette = {
    navy: "#0D1B2A", // brand.500
    navyDeep: "#09131F", // brand.700
    gold: "#C4A689", // secondary.500
    goldBright: "#D4AF37", // secondary.main
    cream: "#F9F5EC", // neutrals.50
    white: "#FFFFFF",
    ink: "#1A1A1A",
    muted: "#6B6B6B",
    rule: "#DED6C6",
} as const;

export const FONT_FAMILY = "Cormorant Garamond";

/**
 * `next/font` emits woff2, which `@react-pdf` cannot parse — it needs TTF/OTF.
 * The two weights are vendored into `public/fonts` rather than `src` because
 * only `public` survives into a standalone build, and `process.cwd()` points at
 * the standalone root at runtime.
 */
let registered = false;

export function registerBrochureFonts(): void {
    if (registered) return;

    const dir = path.join(process.cwd(), "public", "fonts");
    Font.register({
        family: FONT_FAMILY,
        fonts: [
            { src: path.join(dir, "CormorantGaramond-Regular.ttf"), fontWeight: 400 },
            { src: path.join(dir, "CormorantGaramond-SemiBold.ttf"), fontWeight: 600 },
        ],
    });

    // The bundled hyphenation splits words mid-line in a way that reads badly at
    // display sizes; keep words intact and let them wrap.
    Font.registerHyphenationCallback((word) => [word]);

    registered = true;
}

/**
 * Read once into a Buffer rather than handed to `<Image>` as a path.
 * `@react-pdf` treats a string src as a URL first and logs a `fetch failed` per
 * attempt before falling back to the filesystem — four spurious errors per
 * two-page brochure. A Buffer skips that resolution entirely.
 */
let logo: Buffer | null = null;

export function logoBuffer(): Buffer {
    logo ??= readFileSync(path.join(process.cwd(), "public", "logo.png"));
    return logo;
}
