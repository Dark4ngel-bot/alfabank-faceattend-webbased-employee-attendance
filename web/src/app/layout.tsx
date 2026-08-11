import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#123c8c",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Presensi",
  description: "Sistem Presensi Karyawan",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Presensi",
  },
  icons: {
    icon: [
      { url: "/api/site-logo?raw=1", type: "image/png" },
    ],
    shortcut: "/api/site-logo?raw=1",
    apple: "/api/site-logo?raw=1",
  },
  other: {
    google: "notranslate",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      translate="no"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} notranslate h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/api/site-logo?raw=1" type="image/png" />
        <link rel="shortcut icon" href="/api/site-logo?raw=1" />
        <link rel="apple-touch-icon" href="/api/site-logo?raw=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        suppressHydrationWarning
        className="notranslate min-h-full flex flex-col"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
