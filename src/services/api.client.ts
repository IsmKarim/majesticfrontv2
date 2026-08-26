import "server-only";

import { siteConfig } from "@/config/site";

/**
 * Thrown for any non-2xx response. A plain Error subclass rather than a wrapper
 * object so it survives `throw`/`catch` across the service layer, while the data
 * we hand back to callers stays a plain serializable object — a hard requirement
 * for anything returned from a `use cache` scope.
 */
export class ApiError extends Error {
    readonly status: number;
    readonly path: string;

    constructor(status: number, path: string, message?: string) {
        super(message ?? `API request failed: ${status} ${path}`);
        this.name = "ApiError";
        this.status = status;
        this.path = path;
    }
}

/**
 * `siteConfig.api.baseUrl` falls back to the relative "/api". Server-side fetch
 * needs an absolute URL, so resolve relative bases against the site origin.
 */
function resolveBaseUrl(): string {
    const base = siteConfig.api.baseUrl;
    if (/^https?:\/\//i.test(base)) return base.replace(/\/$/, "");
    return `${siteConfig.url.replace(/\/$/, "")}/${base.replace(/^\//, "")}`;
}

function buildUrl(path: string, search?: URLSearchParams): string {
    const url = `${resolveBaseUrl()}/${path.replace(/^\//, "")}`;
    const qs = search?.toString();
    return qs ? `${url}?${qs}` : url;
}

/**
 * Typed GET returning parsed JSON. Deliberately native `fetch`: Next patches it
 * for per-render request memoization and dev-time fetch logging, neither of which
 * an HTTP-adapter client like axios participates in.
 */
export async function apiGet<T>(
    path: string,
    options: { search?: URLSearchParams; init?: RequestInit } = {},
): Promise<T> {
    const url = buildUrl(path, options.search);

    const res = await fetch(url, {
        ...options.init,
        headers: { Accept: "application/json", ...options.init?.headers },
        signal: AbortSignal.timeout(siteConfig.api.timeout),
    });

    if (!res.ok) throw new ApiError(res.status, path);

    return (await res.json()) as T;
}

/** Paginated envelope every list endpoint returns. */
export interface Paginated<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
