import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Presensi",
  description: "Sistem Presensi Karyawan Creativemu",
  icons: {
    icon: [
      { url: "/images/creativemu-logo/creativemu-solo.png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/images/creativemu-logo/creativemu-solo.png",
    apple: "/images/creativemu-logo/creativemu-solo.png",
  },
  other: {
    google: "notranslate",
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
        <link rel="icon" href="/images/creativemu-logo/creativemu-solo.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/images/creativemu-logo/creativemu-solo.png?v=2" />
        <link rel="apple-touch-icon" href="/images/creativemu-logo/creativemu-solo.png?v=2" />
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
