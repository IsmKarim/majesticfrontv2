import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers.
 *
 * These understand `localePrefix: "as-needed"`, so `usePathname()` returns the
 * path *without* the locale segment and `router.replace(path, { locale })`
 * re-adds the prefix only for non-default locales. Using the plain `next/navigation`
 * equivalents here would double-prefix or strip the locale.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
