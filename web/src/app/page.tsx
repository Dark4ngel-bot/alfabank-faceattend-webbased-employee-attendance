"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootPage() {
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  useEffect(() => {
    const hintTimer = window.setTimeout(() => setHintVisible(true), 900);
    const autoNextTimer = window.setTimeout(() => {
      setIsLeaving(true);
      window.setTimeout(() => {
        window.sessionStorage.setItem("welcomeSeen", "1");
        router.replace("/login");
      }, 420);
    }, 2400);

    return () => {
      window.clearTimeout(hintTimer);
      window.clearTimeout(autoNextTimer);
    };
  }, [router]);

  function goToLogin() {
    if (isLeaving) return;

    setIsLeaving(true);
    window.setTimeout(() => {
      window.sessionStorage.setItem("welcomeSeen", "1");
      router.replace("/login");
    }, 420);
  }

  return (
    <main
      role="button"
      tabIndex={0}
      onClick={goToLogin}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          goToLogin();
        }
      }}
      className={`fixed inset-0 z-[999] flex cursor-pointer select-none flex-col items-center justify-center overflow-hidden bg-[#f6f8ff] px-6 transition-all duration-500 ${
        isLeaving ? "scale-105 opacity-0 blur-md" : "opacity-100"
      }`}
      aria-label="Lanjut ke halaman login"
    >
      <style>{`
        @keyframes introLogoPulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 8px 18px rgba(18, 60, 140, 0.12));
          }
          50% {
            transform: scale(1.045);
            filter: drop-shadow(0 14px 26px rgba(255, 138, 0, 0.18));
          }
        }

        @keyframes introScanLine {
          0% {
            transform: translateY(-84px);
            opacity: 0;
          }
          12%,
          88% {
            opacity: 1;
          }
          100% {
            transform: translateY(84px);
            opacity: 0;
          }
        }

        @keyframes introTextIn {
          0% {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .intro-logo-pulse {
          animation: introLogoPulse 2.2s ease-in-out infinite;
        }

        .intro-scan-line {
          animation: introScanLine 2.4s ease-in-out infinite;
        }

        .intro-text-in {
          animation: introTextIn 560ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-logo-pulse,
          .intro-scan-line,
          .intro-text-in {
            animation: none !important;
          }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,0,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(18,60,140,0.18),transparent_38%)]" />

      <div className="relative flex h-56 w-56 items-center justify-center md:h-72 md:w-72">
        <div className="absolute inset-3 rounded-[2rem] border border-[#123c8c]/10 bg-white/25 shadow-2xl shadow-slate-300/30 backdrop-blur-xl" />
        <div className="intro-scan-line absolute left-8 right-8 top-1/2 z-20 h-0.5 bg-gradient-to-r from-transparent via-[#ff8a00] to-transparent shadow-[0_0_14px_rgba(255,138,0,0.72)]" />

        <div className="relative z-10 flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] border border-white/80 bg-white p-5 shadow-[0_24px_58px_rgba(18,60,140,0.14)] md:h-40 md:w-40 md:p-7">
          <Image
            src="/images/creativemu-logo/creativemu.png"
            alt="Creativemu Logo"
            width={140}
            height={140}
            className="intro-logo-pulse h-full w-full object-contain"
            priority
          />
        </div>
      </div>

      <div className="relative mt-9 text-center md:mt-12">
        <h1 className="intro-text-in text-3xl font-black uppercase tracking-[0.18em] text-slate-950 md:text-5xl">
          Creativemu
        </h1>
        <p
          className="intro-text-in mt-3 text-xs font-black uppercase tracking-[0.28em] text-[#ff8a00] md:text-sm"
          style={{ animationDelay: "160ms" }}
        >
          Sistem Presensi Wajah
        </p>
      </div>

      <p
        className={`relative mt-14 text-sm font-semibold text-slate-400 transition-opacity duration-300 md:mt-16 ${
          hintVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        Tap di mana saja untuk melanjutkan
      </p>
    </main>
  );
}
