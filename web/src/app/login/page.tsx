"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/MobileShell";

const DEMO_ACCOUNTS = [
  { label: "Demo Owner", email: "owner@creativemu.co.id", password: "123456" },
  { label: "Demo Admin", email: "admin@creativemu.co.id", password: "123456" },
  { label: "Demo CS", email: "cs@creativemu.co.id", password: "123456" },
  { label: "Demo Karyawan", email: "employee@company.com", password: "123456" },
] as const;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loginUser(loginEmail: string, loginPassword: string) {
    if (!loginEmail || !loginPassword) {
      alert("Email dan password wajib diisi.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Login gagal.");
        return;
      }

      router.push(result.redirectTo || "/home");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loginUser(email, password);
  }

  async function handleQuickLogin(emailValue: string, passwordValue: string) {
    setEmail(emailValue);
    setPassword(passwordValue);
    await loginUser(emailValue, passwordValue);
  }

  return (
    <MobileShell variant="auth" withBottomPadding={false}>
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,204,0,0.12),transparent_32%),radial-gradient(circle_at_top_right,rgba(18,60,140,0.15),transparent_36%)]" />

        <div className="relative z-10 grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div className="relative flex flex-col px-6 py-7 md:px-12 lg:justify-between lg:px-20 lg:py-14">
            <Image
              src="/images/alfabank-logo.svg"
              alt="Alfabank Background Logo"
              width={620}
              height={620}
              className="pointer-events-none absolute -left-20 top-1/2 hidden -translate-y-1/2 opacity-[0.035] lg:block"
              priority
            />

            <Image
              src="/images/alfabank-logo.svg"
              alt="Alfabank Background Logo"
              width={300}
              height={300}
              className="pointer-events-none absolute -right-20 top-24 opacity-[0.03] lg:hidden"
              priority
            />

            <div className="relative z-10">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white p-1 shadow-xl shadow-slate-900/60 md:h-14 md:w-14">
                  <Image
                    src="/images/alfabank-icon.svg"
                    alt="Alfabank Icon"
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>

                <div>
                  <h1 className="text-xl font-black tracking-tight text-white md:text-2xl">
                    Alfabank
                  </h1>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFCC00] md:text-xs">
                    Employee Attendance System
                  </p>
                </div>
              </div>

              <div className="mt-14 max-w-2xl md:mt-16 lg:mt-28">
                <p className="text-xs font-black uppercase tracking-[0.35em] text-[#FFCC00] md:text-sm">
                  Welcome Back
                </p>

                <h2 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight md:mt-5 md:text-6xl text-white">
                  <span className="typewriter-title" style={{ borderRightColor: "#FFCC00" }}>Alfabank Presence</span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400 md:mt-6 md:text-base md:leading-8">
                  Sistem absensi digital untuk karyawan Alfabank dengan
                  formulir absensi, upload bukti, riwayat kehadiran, dan
                  pengelolaan data absensi yang lebih cepat dan terintegrasi.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-10 hidden text-sm font-semibold text-zinc-500 lg:block">
              © 2026 FaceAttend for Alfabank
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="flex items-start justify-center px-6 pb-8 pt-2 md:px-12 md:pb-12 lg:items-center lg:bg-white/5 lg:px-20 lg:py-14 lg:backdrop-blur-xl">
            <form
              suppressHydrationWarning
              onSubmit={handleSubmit}
              className="w-full max-w-md rounded-[2rem] border border-zinc-800 bg-zinc-950 p-5 shadow-2xl shadow-slate-950/80 backdrop-blur-2xl md:p-8 text-white"
            >
              <div className="mb-7 md:mb-8">
                <h3 className="text-3xl font-black tracking-tight text-white">
                  Sign In
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  Gunakan akun owner, admin, CS, atau karyawan demo.
                </p>
              </div>

              <label className="text-sm font-black text-zinc-300">Email</label>
              <input
                suppressHydrationWarning
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="employee@company.com"
                autoComplete="email"
                className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-sm font-semibold outline-none transition focus:border-[#FFCC00] focus:bg-zinc-800 text-white"
              />

              <label className="mt-5 block text-sm font-black text-zinc-300">
                Password
              </label>
              <input
                suppressHydrationWarning
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-sm font-semibold outline-none transition focus:border-[#FFCC00] focus:bg-zinc-800 text-white"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 block w-full rounded-2xl bg-[#FFCC00] px-5 py-4 text-center text-sm font-black text-[#123c8c] shadow-xl shadow-yellow-500/10 transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>

              <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#FFCC00]">
                  Akun Login
                </p>
                <div className="mt-2 space-y-1 text-xs font-semibold text-zinc-400">
                  <p>Owner: owner@creativemu.co.id</p>
                  <p>Admin: admin@creativemu.co.id</p>
                  <p>CS: cs@creativemu.co.id</p>
                  <p>Karyawan: employee@company.com</p>
                </div>
                <p className="mt-2 text-xs font-bold text-zinc-500">
                  Password semua akun: 123456
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {DEMO_ACCOUNTS.map((account) => (
                    <button
                      key={account.label}
                      type="button"
                      onClick={() =>
                        handleQuickLogin(account.email, account.password)
                      }
                      disabled={isLoading}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-black text-[#FFCC00] transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {account.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          <div className="px-6 pb-6 text-xs font-semibold text-zinc-500 lg:hidden">
            © 2026 FaceAttend for Alfabank
          </div>
        </div>
      </section>
    </MobileShell>
  );
}
