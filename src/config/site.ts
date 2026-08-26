export type SiteConfig = typeof siteConfig;

// Canonical origin, no trailing slash. Every absolute URL the site emits —
// canonicals, hreflang alternates, the sitemap, JSON-LD — is built from this,
// so a preview deployment MUST override it or it will advertise production URLs
// and invite Google to index the wrong host.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://majestickeys.com").replace(/\/$/, "");

export const siteConfig = {

  name: "Majestic Keys",
  description: "Premium real estate agency offering luxury properties, expert guidance, and exceptional service for buying, selling, and renting properties.",
  tagline: "Your Key to Luxury Living",
  url: SITE_URL,
  ogImage: `${SITE_URL}/og-image.jpg`,


  contact: {
    email: "info@majestickeys.com",
    phone: "+1 (555) 123-4567",
    whatsapp: "+1 (555) 123-4567",
    address: {
      street: "123 Luxury Boulevard",
      city: "Casablanca",
      state: "Casablanca-Settat",
      zip: "20000",
      country: "Morocco",
    },
  },

  businessHours: {
    weekdays: "9:00 AM - 6:00 PM",
    saturday: "10:00 AM - 4:00 PM",
    sunday: "Closed",
    timezone: "GMT+1",
  },


  links: {
    facebook: "https://facebook.com/majestickeys",
    instagram: "https://instagram.com/majestickeys",
    twitter: "https://twitter.com/majestickeys",
    linkedin: "https://linkedin.com/company/majestickeys",
    youtube: "https://youtube.com/@majestickeys",
    tiktok: "https://tiktok.com/@majestickeys",
    pinterest: "https://pinterest.com/majestickeys",
  },


  seo: {
    keywords: [
      "real estate",
      "luxury properties",
      "property for sale",
      "homes for rent",
      "real estate agency",
      "Casablanca real estate",
      "luxury homes",
      "property investment",
    ],
    authors: [
      {
        name: "Majestic Keys Team",
        url: "https://majestickeys.com/about/team",
      },
    ],
    creator: "Majestic Keys",
    publisher: "Majestic Keys Real Estate Agency",
    locale: "en_US",
    alternateLocales: ["fr_FR", "ar_MA"], // French and Arabic for Morocco
  },

  // Features & Services
  features: {
    propertyTypes: [
      "Residential",
      "Commercial",
      "Luxury Estates",
      "Apartments",
      "Villas",
      "Land",
      "Investment Properties",
    ],
    services: [
      "Property Sales",
      "Property Rentals",
      "Property Management",
      "Property Valuation",
      "Investment Advisory",
      "Mortgage Assistance",
      "Legal Consultation",
      "Virtual Tours",
    ],
  },

  // Application Settings
  settings: {
    // Pagination
    itemsPerPage: 12,
    propertiesPerPage: 24,
    blogPostsPerPage: 10,

    // Search
    maxSearchResults: 100,
    searchDebounceMs: 300,

    // Images
    maxImageUpload: 10,
    maxImageSize: 5 * 1024 * 1024,
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],

    // Property Listing
    minPrice: 50000,
    maxPrice: 50000000,
    currencies: ["MAD", "USD", "EUR"],
    defaultCurrency: "MAD",

    // Maps
    defaultMapCenter: {
      lat: 33.5731,
      lng: -7.5898,
    }, // Casablanca coordinates
    defaultMapZoom: 12,
  },



  // Analytics & Tracking
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID,
  },

  // Third-party Integrations
  integrations: {
    mapProvider: "google",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
  },


  featureFlags: {
    enableVirtualTours: true,
    enable3DFloorPlans: true,
    enableMortgageCalculator: true,
    enablePropertyComparison: true,
    enableSavedSearches: true,
    enablePriceAlerts: true,
    enableLiveChat: false,
    enableDarkMode: true,
    enableMultiLanguage: true,
    enablePropertyVideos: true,
  },


  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    timeout: 30000,
    retryAttempts: 3,
    version: "v1",
  },


  cache: {
    propertiesStaleTime: 5 * 60 * 1000, // 5 minutes
    agentsStaleTime: 10 * 60 * 1000, // 10 minutes
    blogsStaleTime: 15 * 60 * 1000, // 15 minutes
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  },


  emailTemplates: {
    inquiry: {
      subject: "Property Inquiry - Majestic Keys",
      from: "inquiries@majestickeys.com",
    },
    propertyAlert: {
      subject: "New Property Alert - Majestic Keys",
      from: "alerts@majestickeys.com",
    },
    newsletter: {
      subject: "Majestic Keys Newsletter",
      from: "newsletter@majestickeys.com",
    },
  },


  propertyOptions: {
    bedrooms: [1, 2, 3, 4, 5, 6, 7, 8, "9+"],
    bathrooms: [1, 2, 3, 4, 5, "6+"],
    propertyTypes: [
      "House",
      "Apartment",
      "Villa",
      "Penthouse",
      "Studio",
      "Townhouse",
      "Duplex",
      "Land",
      "Commercial",
      "Office",
    ],
    amenities: [
      "Swimming Pool",
      "Gym",
      "Parking",
      "Garden",
      "Balcony",
      "Terrace",
      "Security",
      "Elevator",
      "Air Conditioning",
      "Heating",
      "Fireplace",
      "Storage",
      "Pet Friendly",
      "Furnished",
      "Sea View",
      "City View",
    ],
    listingTypes: ["For Sale", "For Rent", "Sold", "Rented"],
  },



  rateLimits: {
    contactForm: {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000,
    },
    search: {
      maxRequests: 100,
      windowMs: 60 * 1000,
    },
    apiGeneral: {
      maxRequests: 100,
      windowMs: 15 * 60 * 1000,
    },
  },


};

export function getSiteConfig<T extends keyof typeof siteConfig>(
  key: T
): typeof siteConfig[T] {
  return siteConfig[key];
}

export const getContactEmail = () => siteConfig.contact.email;
export const getContactPhone = () => siteConfig.contact.phone;
export const getSocialLinks = () => siteConfig.links;
export const isFeatureEnabled = (feature: keyof typeof siteConfig.featureFlags) =>
  siteConfig.featureFlags[feature];