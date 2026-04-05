import type {
  Testimonial,
  AuthorInfo,
} from "./types";
 
// ─── Individual Author Mocks ─────────────────────────────────
 
export const mockAuthors: Record<string, AuthorInfo> = {
  isabelle: {
    name: "Isabelle Laurent",
    avatar: "https://i.pravatar.cc/120?img=1",
    role: "CEO",
    company: "Atelier Lumière",
  },
  james: {
    name: "James Whitfield",
    avatar: "https://i.pravatar.cc/120?img=3",
    role: "Managing Director",
    company: "Crescent Capital",
  },
  amira: {
    name: "Amira El Fassi",
    avatar: "https://i.pravatar.cc/120?img=5",
    role: "Art Director",
  },
  karim: {
    name: "Karim Benali",
    avatar: "https://i.pravatar.cc/120?img=8",
    role: "Founder",
    company: "Nexus Ventures",
  },
  sofia: {
    name: "Sofia Amine",
    avatar: "https://i.pravatar.cc/120?img=9",
    role: "Private Banker",
    company: "Banque Privée du Maroc",
  },
  omar: {
    name: "Omar Tazi",
    avatar: "https://i.pravatar.cc/120?img=12",
    role: "Architect",
    company: "Studio Tazi",
  },
  elena: {
    name: "Elena Vasquez",
    avatar: "https://i.pravatar.cc/120?img=16",
    role: "Diplomat",
  },
  youssef: {
    name: "Youssef Chraibi",
    avatar: "https://i.pravatar.cc/120?img=11",
    role: "Tech Entrepreneur",
    company: "Atlas Digital",
  },
};
 
 
export const mockTestimonials: Testimonial[] = [
  {
    id: "tst_001",
    author: mockAuthors.isabelle,
    content:
      "Majestic Keys transformed what could have been a stressful journey into something truly delightful. Their attention to detail and understanding of exactly what we were looking for was remarkable.",
    rating: 5,
    propertyType: "Penthouse",
    location: "Anfa, Casablanca",
    date: "2025-11-14",
    featured: true,
  },
  {
    id: "tst_002",
    author: mockAuthors.james,
    content:
      "From the first viewing to the final handshake, every interaction felt curated and intentional. They didn't just find us a house — they found us the right home.",
    rating: 5,
    propertyType: "Villa",
    location: "Bouskoura Golf City",
    date: "2025-10-28",
    featured: true,
  },
  {
    id: "tst_003",
    author: mockAuthors.amira,
    content:
      "Their knowledge of the luxury market is unmatched. Within two weeks they presented three properties that each exceeded our expectations. We closed on our dream estate in record time.",
    rating: 5,
    propertyType: "Estate",
    location: "Dar Bouazza",
    date: "2025-09-05",
    featured: true,
  },
  {
    id: "tst_004",
    author: mockAuthors.karim,
    content:
      "What sets Majestic Keys apart is how personally invested they become. It never felt transactional — it felt like having a trusted advisor who genuinely cared about the outcome.",
    rating: 5,
    propertyType: "Contemporary Villa",
    location: "CIL, Casablanca",
    date: "2025-08-19",
    featured: true,
  },
  {
    id: "tst_005",
    author: mockAuthors.sofia,
    content:
      "I recommend Majestic Keys to all my private banking clients. Their discretion, professionalism, and deep understanding of high-value transactions make them the only agency I trust for premium placements.",
    rating: 5,
    propertyType: "Duplex",
    location: "Gauthier, Casablanca",
    date: "2025-07-22",
    featured: true,
  },
  {
    id: "tst_006",
    author: mockAuthors.omar,
    content:
      "As an architect, I am particular about space, light, and craftsmanship. Majestic Keys understood that language instinctively and showed me only properties that met those standards.",
    rating: 5,
    propertyType: "Loft",
    location: "Maarif, Casablanca",
    date: "2025-06-10",
    featured: false,
  },
  {
    id: "tst_007",
    author: mockAuthors.elena,
    content:
      "Relocating internationally is never simple. Majestic Keys handled every complexity with grace — from neighborhood guidance to legal coordination — making Casablanca feel like home from day one.",
    rating: 4,
    propertyType: "Apartment",
    location: "Racine, Casablanca",
    date: "2025-05-03",
    featured: false,
  },
  {
    id: "tst_008",
    author: mockAuthors.youssef,
    content:
      "Speed and precision — that is what I needed and that is exactly what they delivered. The entire process from brief to closing took less than a month. Exceptional execution.",
    rating: 5,
    propertyType: "Penthouse",
    location: "Marina, Casablanca",
    date: "2025-04-17",
    featured: false,
  },
];