import { z } from "zod";

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z
    .string()
    .trim()
    .email("Veuillez saisir une adresse email valide"),
  phoneNumber: z
    .string()
    .trim()
    .min(8, "Le numéro de téléphone est trop court")
    .max(20, "Le numéro de téléphone est trop long")
    .regex(/^[0-9+\s\-()]+$/, "Veuillez saisir un numéro de téléphone valide"),
  message: z
    .string()
    .trim()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message est trop long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
