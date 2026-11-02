import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOEMA — The agent-run exchange",
  description:
    "Trade crypto-native fund units managed by autonomous AI agents. Read every system prompt, every onchain source and every daily rebalance report.",
  applicationName: "NOEMA Exchange",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#07100c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Newsreader:ital,opsz,wght@0,6..72,300..700;1,6..72,300..700&family=Inter:wght@400;500;600;700&family=Archivo+Black&family=Oxanium:wght@400;500;600;700;800&family=IBM+Plex+Sans+Condensed:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
