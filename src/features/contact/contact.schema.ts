import { z } from "zod";

/** Message keys resolved against the `contact.validation` namespace. */
type Translate = (key: string) => string;

/**
 * Built per-locale rather than as a module constant: validation messages are
 * user-facing copy and have to come from the active translation catalog.
 */
export const createContactFormSchema = (t: Translate) =>
  z.object({
    firstName: z.string().trim().min(2, t("firstNameMin")),
    lastName: z.string().trim().min(2, t("lastNameMin")),
    email: z.string().trim().email(t("emailInvalid")),
    phoneNumber: z
      .string()
      .trim()
      .min(8, t("phoneShort"))
      .max(20, t("phoneLong"))
      .regex(/^[0-9+\s\-()]+$/, t("phoneInvalid")),
    message: z.string().trim().min(10, t("messageMin")).max(2000, t("messageLong")),
  });

/** Shape only — the messages carried here are never surfaced. */
const shapeSchema = createContactFormSchema((key) => key);

export type ContactFormValues = z.infer<typeof shapeSchema>;
