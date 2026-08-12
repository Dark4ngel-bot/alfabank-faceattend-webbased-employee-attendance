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
  themeColor: "#7f1d1d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Presensi Alfabank",
  description: "Sistem Presensi Karyawan Alfabank",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Presensi Alfabank",
  },
  icons: {
    icon: [
      { url: "/icon.png?v=alfabank-shortcut-20260812", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png?v=alfabank-shortcut-20260812", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/icon.png?v=alfabank-shortcut-20260812",
    apple: "/apple-touch-icon.png?v=alfabank-shortcut-20260812",
  },
  other: {
    google: "notranslate",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "Presensi Alfabank",
    "application-name": "Presensi Alfabank",
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
        <link rel="icon" sizes="512x512" href="/icon.png?v=alfabank-shortcut-20260812" type="image/png" />
        <link rel="shortcut icon" href="/icon.png?v=alfabank-shortcut-20260812" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=alfabank-shortcut-20260812" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Presensi Alfabank" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
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
