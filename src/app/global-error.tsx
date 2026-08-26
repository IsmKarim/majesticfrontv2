"use client";

/**
 * Last-resort boundary for failures in the root layout itself, where no theme
 * provider or fonts are available. It replaces the whole document, so it must
 * render its own <html>/<body> and can only rely on inline styles.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="fr">
            <body
                style={{
                    margin: 0,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0D1B2A",
                    color: "#fff",
                    fontFamily: "system-ui, sans-serif",
                    textAlign: "center",
                    padding: "24px",
                }}
            >
                <div style={{ maxWidth: "480px" }}>
                    <h1 style={{ fontSize: "1.75rem", fontWeight: 600, marginBottom: "12px" }}>
                        Service momentanément indisponible
                    </h1>
                    <p style={{ color: "#9aa5b1", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        Nous rencontrons un incident technique. Merci de réessayer dans quelques instants.
                    </p>
                    {error.digest && (
                        <p style={{ color: "#5c6672", fontSize: "0.75rem", marginTop: "16px" }}>
                            Référence : {error.digest}
                        </p>
                    )}
                    <button
                        onClick={reset}
                        style={{
                            marginTop: "24px",
                            padding: "14px 32px",
                            border: "none",
                            background: "#C9A227",
                            color: "#0D1B2A",
                            fontSize: "0.8rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            cursor: "pointer",
                        }}
                    >
                        Réessayer
                    </button>
                </div>
            </body>
        </html>
    );
}
