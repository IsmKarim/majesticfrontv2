import { cacheLife } from "next/cache";
import { FooterView } from "./footer";

// The copyright year is non-deterministic, which Cache Components rejects inside the
// static shell. Caching it keeps the footer prerendered; `days` lets the year roll
// over on its own without any request-time work.
export async function Footer() {
    "use cache";
    cacheLife("days");

    return <FooterView year={new Date().getFullYear()} />;
}
