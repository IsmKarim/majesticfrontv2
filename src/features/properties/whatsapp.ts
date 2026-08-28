/**
 * `wa.me` wants the number as digits only — no `+`, spaces or punctuation.
 * Same normalisation the social bar already applies in
 * `src/features/homePage/socialMediaBar.tsx`.
 */
export function whatsAppNumber(phone: string): string {
    return phone.replace(/\D/g, "");
}

/** Builds a click-to-chat link with the message prefilled. */
export function buildWhatsAppHref(phone: string, message: string): string {
    return `https://wa.me/${whatsAppNumber(phone)}?text=${encodeURIComponent(message)}`;
}
