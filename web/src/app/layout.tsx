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
  title: {
    default: "Presensi",
    template: "%s - Alfabank Jogja",
  },
  description: "Sistem Presensi Karyawan Alfabank Jogja",
  icons: {
    icon: "/images/alfabank-logo/alfabank-solo.png",
    shortcut: "/images/alfabank-logo/alfabank-solo.png",
    apple: "/images/alfabank-logo/alfabank-solo.png",
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
      <body
        suppressHydrationWarning
        className="notranslate min-h-full flex flex-col"
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
