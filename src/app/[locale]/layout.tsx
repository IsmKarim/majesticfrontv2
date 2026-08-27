// src/app/[locale]/layout.tsx
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { locales, defaultLocale, type Locale } from '@/i18n/locales';
import { ogLocales } from '@/config/seo';
import { siteConfig } from '@/config/site';
import { cormorant_garamond, display } from '@/theme/fonts';
import './globals.css';
import { Provider } from '@/components/ui/provider';
import { Box } from '@chakra-ui/react';
import { Footer, Navbar } from '@/components/layout';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (locales.includes(rawLocale as Locale) ? rawLocale : defaultLocale) as Locale;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const content = {
    title: t('title'),
    description: t('description'),
    // `keywords` is an array in the catalog, so it has to be read raw.
    keywords: t.raw('keywords') as string[],
    ogLocale: ogLocales[locale],
  };
  const localePath = locale === defaultLocale ? '' : `/${locale}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: content.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: content.description,
    keywords: content.keywords,
    authors: siteConfig.seo.authors,
    creator: siteConfig.seo.creator,
    publisher: siteConfig.seo.publisher,
    alternates: {
      canonical: localePath || '/',
      languages: {
        fr: '/',
        en: '/en',
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      url: localePath || '/',
      siteName: siteConfig.name,
      title: content.title,
      description: content.description,
      locale: content.ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      images: [
        {
          url: '/images/properties/riad.jpg',
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      images: ['/images/properties/riad.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0D1B2A',
};

function RealEstateAgentJsonLd() {
  const { street, city, state, zip, country } = siteConfig.contact.address;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/logo.png`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: city,
      addressRegion: state,
      postalCode: zip,
      addressCountry: country === 'Morocco' ? 'MA' : country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.settings.defaultMapCenter.lat,
      longitude: siteConfig.settings.defaultMapCenter.lng,
    },
    sameAs: Object.values(siteConfig.links),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning className={cormorant_garamond.variable}>
      <body className={cormorant_garamond.variable}>
        <RealEstateAgentJsonLd />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Provider>
            <Navbar />
            <Box minH="calc(100vh)" bg="brand.500">
              {children}
            </Box>
            <Footer />
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
