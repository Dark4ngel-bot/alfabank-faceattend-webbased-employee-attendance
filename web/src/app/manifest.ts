import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Presensi Alfabank",
    short_name: "Alfabank",
    description: "Sistem Presensi Karyawan Alfabank",
    start_url: "/",
    display: "fullscreen",
    display_override: ["fullscreen", "standalone"],
    background_color: "#ffffff",
    theme_color: "#123c8c",
    orientation: "portrait",
    icons: [
      {
        src: "/api/site-logo?raw=1",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/api/site-logo?raw=1",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
