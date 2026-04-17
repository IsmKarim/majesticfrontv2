
export interface Property {
    id : string, 
    title: string,
    slug : string, 
    category: string,
    transactionType: string,
    price: number,
    description: string,
    totalArea: number,
    livingArea: number,
    bedrooms: number,
    bathrooms: number,
    parkingSpaces: number,
    isFurnished: boolean,
    city: string,
    neighborhood: string,
    buildingAge: number,
    propertyCondition: string,
    listingStatus: string,
    imageUrls: string[],
    standingLeveling: string,
    orientation: string,
    floorNumber: number,
    syndicateFees: number,
    propertyRef: string,
    hasBasement: boolean,
    hasSecurity: boolean
    hasBalcony: boolean,
    hasTerrace: boolean,
    hasElevator: boolean,
    hasAirConditioning: boolean,
    hasPool: boolean,
    hasEquippedKitchen: boolean,
    hasEasyAccess: boolean,
    hasGarden: boolean,
    hasOceanView: boolean,
    coverImage : PropertyImage ,
    images:  PropertyImage[]
}


interface PropertyImage {
    id : string ,
    url : string , 
    alt? : string
}


export const mockProperties: Property[] = [
  {
    id: "prop-001",
    title: "Appartement moderne meublé à Gauthier",
    slug: "appartement-moderne-meuble-gauthier-casablanca",
    category: "Apartment",
    transactionType: "Rent",
    price: 12500,
    description:
      "Bel appartement meublé situé à Gauthier, proche des commerces, cafés et axes principaux. Idéal pour jeune actif ou couple.",
    totalArea: 92,
    livingArea: 84,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    isFurnished: true,
    city: "Casablanca",
    neighborhood: "Gauthier",
    buildingAge: 6,
    propertyCondition: "Excellent",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/riad.jpg",
      "/images/properties/gauthier-2.jpg",
      "/images/properties/gauthier-3.jpg"
    ],
    standingLeveling: "High Standing",
    orientation: "South-West",
    floorNumber: 4,
    syndicateFees: 450,
    propertyRef: "CAS-GAU-2401",
    hasBasement: false,
    hasSecurity: true,
    hasBalcony: true,
    hasTerrace: false,
    hasElevator: true,
    hasAirConditioning: true,
    hasPool: false,
    hasEquippedKitchen: true,
    hasEasyAccess: true,
    hasGarden: false,
    hasOceanView: false,
    coverImage: {
      id: "riad",
      url: "/images/properties/riad.jpg",
      alt: "Appartement meublé à Gauthier"
    },
    images: [
      {
        id: "riad",
        url: "/images/properties/riad.jpg",
        alt: "Salon lumineux"
      },
      {
        id: "img-002",
        url: "/images/properties/riad.jpg",
        alt: "Cuisine équipée"
      },
      {
        id: "img-003",
        url: "/images/properties/riad.jpg",
        alt: "Chambre principale"
      }
    ]
  },
  {
    id: "prop-002",
    title: "Villa contemporaine avec piscine à Bouskoura",
    slug: "villa-contemporaine-piscine-bouskoura",
    category: "Villa",
    transactionType: "Sale",
    price: 6800000,
    description:
      "Villa de haut standing dans une résidence sécurisée à Bouskoura, avec jardin, piscine et prestations premium.",
    totalArea: 420,
    livingArea: 320,
    bedrooms: 4,
    bathrooms: 4,
    parkingSpaces: 2,
    isFurnished: false,
    city: "Casablanca",
    neighborhood: "Bouskoura",
    buildingAge: 3,
    propertyCondition: "New",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/bouskoura-1.jpg",
      "/images/properties/bouskoura-2.jpg",
      "/images/properties/bouskoura-3.jpg"
    ],
    standingLeveling: "Luxury",
    orientation: "South",
    floorNumber: 0,
    syndicateFees: 1200,
    propertyRef: "CAS-BOU-2402",
    hasBasement: true,
    hasSecurity: true,
    hasBalcony: true,
    hasTerrace: true,
    hasElevator: false,
    hasAirConditioning: true,
    hasPool: true,
    hasEquippedKitchen: true,
    hasEasyAccess: true,
    hasGarden: true,
    hasOceanView: false,
    coverImage: {
      id: "img-004",
      url: "/images/properties/villa.jpg",
      alt: "Villa avec piscine à Bouskoura"
    },
    images: [
      {
        id: "img-004",
        url: "/images/properties/bouskoura-cover.jpg",
        alt: "Façade de villa"
      },
      {
        id: "img-005",
        url: "/images/properties/bouskoura-2.jpg",
        alt: "Piscine et jardin"
      },
      {
        id: "img-006",
        url: "/images/properties/bouskoura-3.jpg",
        alt: "Suite parentale"
      }
    ]
  },
  {
    id: "prop-003",
    title: "Studio fonctionnel à louer à Agdal",
    slug: "studio-fonctionnel-location-agdal-rabat",
    category: "Studio",
    transactionType: "Rent",
    price: 5500,
    description:
      "Studio bien agencé à Agdal, proche des universités, tramway et commodités. Convient parfaitement à un étudiant ou jeune cadre.",
    totalArea: 48,
    livingArea: 42,
    bedrooms: 1,
    bathrooms: 1,
    parkingSpaces: 0,
    isFurnished: true,
    city: "Rabat",
    neighborhood: "Agdal",
    buildingAge: 10,
    propertyCondition: "Very Good",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/agdal-1.jpg",
      "/images/properties/agdal-2.jpg"
    ],
    standingLeveling: "Medium Standing",
    orientation: "East",
    floorNumber: 2,
    syndicateFees: 250,
    propertyRef: "RAB-AGD-2403",
    hasBasement: false,
    hasSecurity: false,
    hasBalcony: false,
    hasTerrace: false,
    hasElevator: true,
    hasAirConditioning: false,
    hasPool: false,
    hasEquippedKitchen: true,
    hasEasyAccess: true,
    hasGarden: false,
    hasOceanView: false,
    coverImage: {
      id: "img-007",
      url: "/images/properties/villa2.jpg",
      alt: "Studio à Agdal"
    },
    images: [
      {
        id: "img-007",
        url: "/images/properties/agdal-cover.jpg",
        alt: "Pièce principale"
      },
      {
        id: "img-008",
        url: "/images/properties/agdal-2.jpg",
        alt: "Coin cuisine"
      }
    ]
  },
  {
    id: "prop-004",
    title: "Appartement familial à vendre à Hay Riad",
    slug: "appartement-familial-vente-hay-riad-rabat",
    category: "Apartment",
    transactionType: "Sale",
    price: 2450000,
    description:
      "Appartement spacieux dans un quartier recherché de Rabat, idéal pour une famille cherchant confort et proximité des écoles.",
    totalArea: 156,
    livingArea: 138,
    bedrooms: 3,
    bathrooms: 2,
    parkingSpaces: 1,
    isFurnished: false,
    city: "Rabat",
    neighborhood: "Hay Riad",
    buildingAge: 8,
    propertyCondition: "Very Good",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/hayriad-1.jpg",
      "/images/properties/hayriad-2.jpg",
      "/images/properties/hayriad-3.jpg"
    ],
    standingLeveling: "High Standing",
    orientation: "South-East",
    floorNumber: 3,
    syndicateFees: 500,
    propertyRef: "RAB-HRY-2404",
    hasBasement: false,
    hasSecurity: true,
    hasBalcony: true,
    hasTerrace: false,
    hasElevator: true,
    hasAirConditioning: true,
    hasPool: false,
    hasEquippedKitchen: true,
    hasEasyAccess: true,
    hasGarden: false,
    hasOceanView: false,
    coverImage: {
      id: "img-009",
      url: "/images/properties/hayriad-cover.jpg",
      alt: "Appartement familial à Hay Riad"
    },
    images: [
      {
        id: "img-009",
        url: "/images/properties/hayriad-cover.jpg",
        alt: "Salon"
      },
      {
        id: "img-010",
        url: "/images/properties/hayriad-2.jpg",
        alt: "Salle à manger"
      },
      {
        id: "img-011",
        url: "/images/properties/hayriad-3.jpg",
        alt: "Chambre enfants"
      }
    ]
  },
  {
    id: "prop-005",
    title: "Riad rénové dans la Médina de Marrakech",
    slug: "riad-renove-medina-marrakech",
    category: "Riad",
    transactionType: "Sale",
    price: 3900000,
    description:
      "Authentique riad rénové avec goût dans la médina, parfait pour résidence secondaire ou maison d’hôtes.",
    totalArea: 210,
    livingArea: 180,
    bedrooms: 5,
    bathrooms: 5,
    parkingSpaces: 0,
    isFurnished: true,
    city: "Marrakech",
    neighborhood: "Medina",
    buildingAge: 35,
    propertyCondition: "Renovated",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/riad-1.jpg",
      "/images/properties/riad-2.jpg",
      "/images/properties/riad-3.jpg"
    ],
    standingLeveling: "Luxury",
    orientation: "Inner Courtyard",
    floorNumber: 2,
    syndicateFees: 0,
    propertyRef: "MAR-MED-2405",
    hasBasement: false,
    hasSecurity: false,
    hasBalcony: false,
    hasTerrace: true,
    hasElevator: false,
    hasAirConditioning: true,
    hasPool: true,
    hasEquippedKitchen: true,
    hasEasyAccess: false,
    hasGarden: false,
    hasOceanView: false,
    coverImage: {
      id: "img-012",
      url: "/images/properties/riad-cover.jpg",
      alt: "Riad rénové à Marrakech"
    },
    images: [
      {
        id: "img-012",
        url: "/images/properties/riad-cover.jpg",
        alt: "Patio central"
      },
      {
        id: "img-013",
        url: "/images/properties/riad-2.jpg",
        alt: "Terrasse rooftop"
      },
      {
        id: "img-014",
        url: "/images/properties/riad-3.jpg",
        alt: "Suite marocaine"
      }
    ]
  },
  {
    id: "prop-006",
    title: "Appartement vue mer à Malabata",
    slug: "appartement-vue-mer-malabata-tanger",
    category: "Apartment",
    transactionType: "Sale",
    price: 3100000,
    description:
      "Appartement haut standing à Malabata avec belle vue mer, proche de la corniche, restaurants et hôtels.",
    totalArea: 134,
    livingArea: 120,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    isFurnished: false,
    city: "Tangier",
    neighborhood: "Malabata",
    buildingAge: 4,
    propertyCondition: "Excellent",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/malabata-1.jpg",
      "/images/properties/malabata-2.jpg",
      "/images/properties/malabata-3.jpg"
    ],
    standingLeveling: "High Standing",
    orientation: "North-East",
    floorNumber: 7,
    syndicateFees: 650,
    propertyRef: "TNG-MAL-2406",
    hasBasement: false,
    hasSecurity: true,
    hasBalcony: true,
    hasTerrace: false,
    hasElevator: true,
    hasAirConditioning: true,
    hasPool: false,
    hasEquippedKitchen: true,
    hasEasyAccess: true,
    hasGarden: false,
    hasOceanView: true,
    coverImage: {
      id: "img-015",
      url: "/images/properties/malabata-cover.jpg",
      alt: "Appartement vue mer à Malabata"
    },
    images: [
      {
        id: "img-015",
        url: "/images/properties/malabata-cover.jpg",
        alt: "Vue mer depuis le salon"
      },
      {
        id: "img-016",
        url: "/images/properties/malabata-2.jpg",
        alt: "Cuisine moderne"
      },
      {
        id: "img-017",
        url: "/images/properties/malabata-3.jpg",
        alt: "Balcon avec vue"
      }
    ]
  },
  {
    id: "prop-007",
    title: "Villa en résidence sécurisée à Souissi",
    slug: "villa-residence-securisee-souissi-rabat",
    category: "Villa",
    transactionType: "Rent",
    price: 32000,
    description:
      "Grande villa à louer à Souissi dans un environnement calme et sécurisé. Idéale pour famille ou usage diplomatique.",
    totalArea: 650,
    livingArea: 420,
    bedrooms: 5,
    bathrooms: 4,
    parkingSpaces: 3,
    isFurnished: false,
    city: "Rabat",
    neighborhood: "Souissi",
    buildingAge: 12,
    propertyCondition: "Very Good",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/souissi-1.jpg",
      "/images/properties/souissi-2.jpg",
      "/images/properties/souissi-3.jpg"
    ],
    standingLeveling: "Luxury",
    orientation: "South",
    floorNumber: 0,
    syndicateFees: 0,
    propertyRef: "RAB-SOU-2407",
    hasBasement: true,
    hasSecurity: true,
    hasBalcony: true,
    hasTerrace: true,
    hasElevator: false,
    hasAirConditioning: true,
    hasPool: false,
    hasEquippedKitchen: true,
    hasEasyAccess: true,
    hasGarden: true,
    hasOceanView: false,
    coverImage: {
      id: "img-018",
      url: "/images/properties/souissi-cover.jpg",
      alt: "Villa à Souissi"
    },
    images: [
      {
        id: "img-018",
        url: "/images/properties/souissi-cover.jpg",
        alt: "Jardin extérieur"
      },
      {
        id: "img-019",
        url: "/images/properties/souissi-2.jpg",
        alt: "Salon principal"
      },
      {
        id: "img-020",
        url: "/images/properties/souissi-3.jpg",
        alt: "Façade villa"
      }
    ]
  },
  {
    id: "prop-008",
    title: "Appartement économique à Bourgogne",
    slug: "appartement-economique-bourgogne-casablanca",
    category: "Apartment",
    transactionType: "Sale",
    price: 980000,
    description:
      "Appartement accessible dans le quartier Bourgogne, intéressant pour premier achat ou investissement locatif.",
    totalArea: 74,
    livingArea: 68,
    bedrooms: 2,
    bathrooms: 1,
    parkingSpaces: 0,
    isFurnished: false,
    city: "Casablanca",
    neighborhood: "Bourgogne",
    buildingAge: 18,
    propertyCondition: "Good",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/bourgogne-1.jpg",
      "/images/properties/bourgogne-2.jpg"
    ],
    standingLeveling: "Economic",
    orientation: "West",
    floorNumber: 1,
    syndicateFees: 150,
    propertyRef: "CAS-BOU-2408",
    hasBasement: false,
    hasSecurity: false,
    hasBalcony: true,
    hasTerrace: false,
    hasElevator: false,
    hasAirConditioning: false,
    hasPool: false,
    hasEquippedKitchen: false,
    hasEasyAccess: true,
    hasGarden: false,
    hasOceanView: false,
    coverImage: {
      id: "img-021",
      url: "/images/properties/bourgogne-cover.jpg",
      alt: "Appartement à Bourgogne"
    },
    images: [
      {
        id: "img-021",
        url: "/images/properties/bourgogne-cover.jpg",
        alt: "Façade immeuble"
      },
      {
        id: "img-022",
        url: "/images/properties/bourgogne-2.jpg",
        alt: "Salon simple"
      }
    ]
  },
  {
    id: "prop-009",
    title: "Penthouse avec terrasse à Dar Bouazza",
    slug: "penthouse-terrasse-dar-bouazza",
    category: "Penthouse",
    transactionType: "Sale",
    price: 4550000,
    description:
      "Penthouse premium dans une résidence fermée à Dar Bouazza, avec grande terrasse et prestations de qualité.",
    totalArea: 240,
    livingArea: 180,
    bedrooms: 3,
    bathrooms: 3,
    parkingSpaces: 2,
    isFurnished: false,
    city: "Casablanca",
    neighborhood: "Dar Bouazza",
    buildingAge: 2,
    propertyCondition: "New",
    listingStatus: "Reserved",
    imageUrls: [
      "/images/properties/darbouazza-1.jpg",
      "/images/properties/darbouazza-2.jpg",
      "/images/properties/darbouazza-3.jpg"
    ],
    standingLeveling: "Luxury",
    orientation: "West",
    floorNumber: 5,
    syndicateFees: 900,
    propertyRef: "CAS-DBZ-2409",
    hasBasement: false,
    hasSecurity: true,
    hasBalcony: true,
    hasTerrace: true,
    hasElevator: true,
    hasAirConditioning: true,
    hasPool: true,
    hasEquippedKitchen: true,
    hasEasyAccess: true,
    hasGarden: false,
    hasOceanView: true,
    coverImage: {
      id: "img-023",
      url: "/images/properties/darbouazza-cover.jpg",
      alt: "Penthouse à Dar Bouazza"
    },
    images: [
      {
        id: "img-023",
        url: "/images/properties/darbouazza-cover.jpg",
        alt: "Terrasse panoramique"
      },
      {
        id: "img-024",
        url: "/images/properties/darbouazza-2.jpg",
        alt: "Séjour moderne"
      },
      {
        id: "img-025",
        url: "/images/properties/darbouazza-3.jpg",
        alt: "Piscine résidence"
      }
    ]
  },
  {
    id: "prop-010",
    title: "Bureau professionnel au centre-ville de Casablanca",
    slug: "bureau-professionnel-centre-ville-casablanca",
    category: "Office",
    transactionType: "Rent",
    price: 18000,
    description:
      "Plateau bureau bien situé au centre-ville, idéal pour cabinet, agence ou siège d’entreprise.",
    totalArea: 130,
    livingArea: 130,
    bedrooms: 0,
    bathrooms: 1,
    parkingSpaces: 1,
    isFurnished: false,
    city: "Casablanca",
    neighborhood: "Centre Ville",
    buildingAge: 14,
    propertyCondition: "Good",
    listingStatus: "Available",
    imageUrls: [
      "/images/properties/office-1.jpg",
      "/images/properties/office-2.jpg"
    ],
    standingLeveling: "Business",
    orientation: "East",
    floorNumber: 5,
    syndicateFees: 700,
    propertyRef: "CAS-CEN-2410",
    hasBasement: false,
    hasSecurity: true,
    hasBalcony: false,
    hasTerrace: false,
    hasElevator: true,
    hasAirConditioning: true,
    hasPool: false,
    hasEquippedKitchen: false,
    hasEasyAccess: true,
    hasGarden: false,
    hasOceanView: false,
    coverImage: {
      id: "img-026",
      url: "/images/properties/office-cover.jpg",
      alt: "Bureau au centre-ville"
    },
    images: [
      {
        id: "img-026",
        url: "/images/properties/office-cover.jpg",
        alt: "Open space"
      },
      {
        id: "img-027",
        url: "/images/properties/office-2.jpg",
        alt: "Salle de réunion"
      }
    ]
  }
];