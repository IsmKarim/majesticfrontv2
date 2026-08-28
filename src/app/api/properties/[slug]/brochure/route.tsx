import { renderToBuffer } from "@react-pdf/renderer";
import { getTranslations } from "next-intl/server";

import { BrochureDocument, type BrochureStrings } from "@/features/brochure/brochureDocument";
import { brochureFilename, loadPhotos } from "@/features/brochure/brochureData";
import { registerBrochureFonts } from "@/features/brochure/brochureTheme";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";
import { getPropertyBySlug } from "@/services/properties.service";

// `@react-pdf` needs Node APIs (fontkit reads the vendored TTFs off disk). The
// Node runtime is the default and `export const runtime` is rejected under
// Cache Components, so there is nothing to declare here — just don't opt into edge.

/**
 * Serves the listing brochure as a real PDF download.
 *
 * Deliberately not prerendered: `generateStaticParams` here would build 92 files
 * (46 listings x 2 locales) that most visitors never request. It runs at request
 * time and leans on the photo fetches being cached upstream instead.
 */
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    const { slug } = await params;

    const requested = new URL(request.url).searchParams.get("locale");
    const locale = (locales.includes(requested as Locale) ? requested : defaultLocale) as Locale;

    const property = await getPropertyBySlug(slug);
    if (!property) {
        return new Response("Not found", { status: 404 });
    }

    const [b, d, f, type, tx] = await Promise.all([
        getTranslations({ locale, namespace: "properties.brochure" }),
        getTranslations({ locale, namespace: "properties.detail" }),
        getTranslations({ locale, namespace: "properties.features" }),
        getTranslations({ locale, namespace: "propertyTypes" }),
        getTranslations({ locale, namespace: "transactionTypes" }),
    ]);

    registerBrochureFonts();

    const strings: BrochureStrings = { b, d, f, type, tx };
    let pdf: Buffer;
    try {
        const { cover, grid } = await loadPhotos(property);
        pdf = await renderToBuffer(
            <BrochureDocument
                property={property}
                cover={cover}
                grid={grid}
                strings={strings}
                locale={locale}
            />,
        );
    } catch (error) {
        // Rendering reaches native code via fontkit; surface a 500 rather than
        // letting an unhandled rejection reach the process.
        console.error(`Brochure render failed for ${slug}:`, error);
        return new Response("Brochure unavailable", { status: 500 });
    }

    return new Response(new Uint8Array(pdf), {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${brochureFilename(property)}"`,
            "Content-Length": String(pdf.byteLength),
            // Matches `cacheLife("days")` on the listing itself.
            "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
        },
    });
}
