"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, LogIn, X } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import { AppButton, AppCard, AppInput } from "@/components/ui/AppUI";
import { useCompanyLogo, useCompanyName } from "@/hooks/useCompanyLogo";

type LoginResponse = {
  success?: boolean;
  message?: string;
  redirectTo?: string;
  retryAfterSeconds?: number;
};

type AlertState = {
  open: boolean;
  title: string;
  message: string;
};

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Response API bukan JSON.");
  }
}

function isValidEmailFormat(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
}

function isCreativemuEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return (
    normalized.endsWith("@creativemu.co.id") ||
    normalized.endsWith("@creativemu.com")
  );
}

function LoginMotionStyles() {
  return (
    <style>{`
      @keyframes faceScannerLine {
        0%, 100% {
          top: 0%;
          opacity: 0;
        }
        10%, 90% {
          opacity: 1;
        }
        50% {
          top: 100%;
          opacity: 1;
        }
      }

      @keyframes faceScanBracket {
        0%, 100% {
          transform: scale(1);
          opacity: 0.7;
        }
        50% {
          transform: scale(1.06);
          opacity: 1;
        }
      }

      @keyframes biometricPulse {
        0%, 100% {
          transform: scale(1);
          opacity: 0.15;
        }
        50% {
          transform: scale(1.05);
          opacity: 0.35;
        }
      }

      @keyframes techStatusPulse {
        0%, 100% {
          opacity: 0.4;
          transform: translateY(0);
        }
        50% {
          opacity: 1;
          transform: translateY(-2px);
        }
      }



      @keyframes splashLogoPulse {
        0%, 100% {
          transform: scale(1);
          filter: drop-shadow(0 4px 6px rgba(18, 60, 140, 0.08));
        }
        50% {
          transform: scale(1.05);
          filter: drop-shadow(0 10px 15px rgba(255, 138, 0, 0.18));
        }
      }

      @keyframes splashTextFadeIn {
        0% {
          opacity: 0;
          transform: translateY(10px);
          filter: blur(4px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }
      }

      @keyframes loginEnter {
        0% {
          opacity: 0;
          transform: translateY(16px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes loginCardEnter {
        0% {
          opacity: 0;
          transform: translateY(18px) scale(0.985);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes loginLogoPop {
        0% {
          opacity: 0;
          transform: translateY(10px) scale(0.92);
        }

        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes loginTextReveal {
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

      @keyframes loginFieldEnter {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes loginBackgroundFloat {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(10px, -10px, 0) scale(1.04);
        }
      }

      @keyframes introLogoPulse {
        0%,
        100% {
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

      .login-enter {
        animation: loginEnter 360ms ease-out both;
      }

      .login-card-enter {
        animation: loginCardEnter 420ms ease-out both;
      }

      .login-logo-pop {
        animation: loginLogoPop 320ms ease-out both;
      }

      .login-text-reveal {
        animation: loginTextReveal 420ms ease-out both;
      }

      .login-field-enter {
        opacity: 0;
        animation: loginFieldEnter 320ms ease-out both;
      }

      .login-bg-float {
        animation: loginBackgroundFloat 6s ease-in-out infinite;
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

      .login-field-smooth input {
        transition:
          border-color 220ms ease,
          background-color 220ms ease,
          box-shadow 220ms ease,
          transform 220ms ease;
      }

      .login-field-smooth input:hover {
        transform: translateY(-1px);
        border-color: rgba(18, 60, 140, 0.25);
        box-shadow: 0 4px 12px rgba(18, 60, 140, 0.04);
      }

      .login-field-smooth input:focus {
        transform: translateY(-3px);
        border-color: #123c8c;
        background-color: #edf3fa;
        box-shadow: 
          0 10px 20px -5px rgba(18, 60, 140, 0.12),
          0 0 0 4px rgba(18, 60, 140, 0.08);
      }

      .login-field-smooth label span {
        display: inline-block;
        transition: color 220ms ease, transform 220ms ease;
      }

      .login-field-smooth label:has(input:focus) span {
        color: #123c8c;
        transform: translateX(3px) scale(1.02);
      }

      .login-presence-title {
        background: none;
        color: #123c8c;
      }

      @media (max-width: 767px) {
        .login-presence-title {
          width: auto !important;
          max-width: 100%;
          overflow: visible;
          white-space: normal;
          border-right: 0 !important;
          animation: none !important;
        }
      }

      .login-presence-title {
        background: none;
        color: #123c8c;
      }

      @media (prefers-reduced-motion: reduce) {
        .login-enter,
        .login-card-enter,
        .login-logo-pop,
        .login-text-reveal,
        .login-field-enter,
        .login-bg-float,
        .intro-logo-pulse,
        .intro-scan-line,
        .intro-text-in {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
        }
      }
    `}</style>
  );
}

function FloatingAlert({
  open,
  title,
  message,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes floatingAlertIn {
          0% {
            opacity: 0;
            transform: translateX(70px) translateY(-18px) scale(0.95);
          }
          70% {
            opacity: 1;
            transform: translateX(-6px) translateY(0) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateX(0) translateY(0) scale(1);
          }
        }

        @keyframes alertPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.22);
            opacity: 0.12;
          }
        }

        @keyframes alertIconPop {
          0% {
            transform: scale(0.65) rotate(-8deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.08) rotate(3deg);
            opacity: 1;
          }
          100% {
            transform: scale(1) rotate(0);
            opacity: 1;
          }
        }
      `}</style>

      <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-[25rem] md:right-7 md:top-7">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#c8d3e2]/70 bg-[#dde6f2]/80 shadow-2xl shadow-slate-950/15 ring-1 ring-[#c8d3e2]/60 backdrop-blur-[20px] animate-[floatingAlertIn_320ms_cubic-bezier(0.2,0.9,0.2,1)] dark:border-[#2f394a] dark:bg-[#1a2230]/90 dark:ring-[#2f394a]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f1f5fb]/45 via-[#e2eaf5]/20 to-[#dbe5f1]/15 dark:from-[#232d3c]/65 dark:via-[#1d2635]/30 dark:to-[#1a2230]/20" />

          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(255,138,0,0.16),transparent_44%),radial-gradient(circle_at_top_right,rgba(18,60,140,0.16),transparent_48%)]" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e8eef7]/70 text-slate-700 shadow-sm ring-1 ring-[#c8d3e2] backdrop-blur-xl transition hover:bg-[#dce6f2] hover:text-slate-900 active:scale-95 dark:bg-[#202a39] dark:text-slate-300 dark:ring-[#303b4d] dark:hover:bg-[#273243]"
            aria-label="Tutup alert"
          >
            <X size={19} strokeWidth={2.7} />
          </button>

          <div className="relative p-5">
            <div className="flex items-start gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                <div className="absolute inset-0 rounded-[1.5rem] bg-orange-300/45 animate-[alertPulse_1.6s_ease-in-out_infinite]" />

                <div className="relative flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-orange-200/55 bg-[#f3e9dc]/60 text-orange-700 shadow-xl shadow-orange-200/15 backdrop-blur-xl animate-[alertIconPop_320ms_ease-out] dark:border-orange-300/20 dark:bg-[#3a2b20]/65 dark:text-orange-300">
                  <AlertCircle size={30} strokeWidth={2.8} />
                </div>
              </div>

              <div className="min-w-0 flex-1 pr-9">
                <div className="inline-flex rounded-full bg-[#e8edf5]/65 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-orange-700 ring-1 ring-orange-200/45 backdrop-blur-xl dark:bg-[#2a3343]/80 dark:text-orange-300 dark:ring-orange-300/25">
                  Perhatian
                </div>

                <h2 className="mt-3 text-xl font-black tracking-tight text-slate-900 dark:text-slate-100">
                  {title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                  {message}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-2xl border border-[#b7c6d8] bg-[#315f9c] px-5 text-sm font-black text-[#e9f1fc] shadow-xl shadow-blue-900/10 backdrop-blur-xl transition hover:bg-[#2c568d] active:scale-[0.98] dark:border-[#32527f] dark:bg-[#274b7b] dark:text-[#e7f0ff] dark:hover:bg-[#2a5389]"
            >
              Mengerti
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const companyLogo = useCompanyLogo();
  const companyName = useCompanyName();
  const [allowLoginPage, setAllowLoginPage] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [loginRetryAt, setLoginRetryAt] = useState<number | null>(null);
  const [loginRetrySeconds, setLoginRetrySeconds] = useState(0);

  const [alert, setAlert] = useState<AlertState>({
    open: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const reason = searchParams.get("reason");

    if (reason) {
      setAllowLoginPage(true);
      return;
    }

    const hasSeenWelcome = window.sessionStorage.getItem("welcomeSeen") === "1";

    if (!hasSeenWelcome) {
      router.replace("/");
      return;
    }

    setAllowLoginPage(true);
  }, [router]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const reason = searchParams.get("reason");

    if (reason === "inactive") {
      showAlert(
        "Akun dinonaktifkan",
        "Akun kamu sudah dinonaktifkan, silakan hubungi admin untuk mengaktifkan kembali.",
      );
      return;
    }

    if (reason === "expired") {
      showAlert("Sesi berakhir", "Silakan login kembali untuk melanjutkan.");
    }
  }, []);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }).format(new Date()),
      );
    };

    updateCurrentTime();

    const timer = window.setInterval(updateCurrentTime, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loginRetryAt) return;

    const updateCountdown = () => {
      const remainingSeconds = Math.max(
        0,
        Math.ceil((loginRetryAt - Date.now()) / 1000),
      );

      setLoginRetrySeconds(remainingSeconds);

      if (remainingSeconds <= 0) {
        setLoginRetryAt(null);
      }
    };

    updateCountdown();

    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [loginRetryAt]);

  function showAlert(title: string, message: string) {
    setAlert({
      open: true,
      title,
      message,
    });
  }

  function closeAlert() {
    setAlert({
      open: false,
      title: "",
      message: "",
    });
  }

  async function loginUser(loginEmail: string, loginPassword: string) {
    if (loginRetrySeconds > 0) {
      showAlert(
        "Tunggu 1 menit",
        `Tunggu ${loginRetrySeconds} detik hingga kamu bisa mencoba kembali.`,
      );
      return;
    }

    const normalizedEmail = loginEmail.trim().toLowerCase();

    if (!normalizedEmail || !loginPassword.trim()) {
      showAlert("Data belum lengkap", "Email dan password wajib diisi.");
      return;
    }

    if (!isValidEmailFormat(normalizedEmail)) {
      showAlert(
        "Format email salah",
        "Masukkan email dengan format yang benar, contoh: nama@creativemu.com",
      );
      return;
    }

    if (!isCreativemuEmail(normalizedEmail)) {
      showAlert(
        "Email tidak valid",
        "Masuk hanya dapat menggunakan email resmi Creativemu.",
      );
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
          email: normalizedEmail,
          password: loginPassword,
        }),
      });

      const result: LoginResponse = await readJsonResponse(response);

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfterHeader = Number(response.headers.get("Retry-After"));
          const retryAfterSeconds =
            result.retryAfterSeconds || retryAfterHeader || 60;

          setLoginRetryAt(Date.now() + retryAfterSeconds * 1000);
          setLoginRetrySeconds(retryAfterSeconds);

          showAlert(
            "Tunggu 1 menit",
            `Tunggu ${retryAfterSeconds} detik hingga kamu bisa mencoba kembali.`,
          );
          return;
        }

        showAlert("Masuk gagal", result.message || "Masuk gagal.");
        return;
      }

      router.replace(result.redirectTo || "/beranda");
      router.refresh();
    } catch (error) {
      console.error("LOGIN_ERROR:", error);

      showAlert(
        "Terjadi kesalahan",
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat login.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loginUser(email, password);
  }

  const formIsBusy = isLoading || loginRetrySeconds > 0;
  const alertMessage =
    loginRetrySeconds > 0 && alert.title === "Tunggu 1 menit"
      ? `Tunggu ${loginRetrySeconds} detik hingga kamu bisa mencoba kembali.`
      : alert.message;

  if (!allowLoginPage) {
    return null;
  }

  return (
    <MobileShell variant="auth" withBottomPadding={false}>
      <LoginMotionStyles />

      <section className="relative min-h-dvh w-full overflow-hidden bg-[#e6ecf3] dark:bg-[#111823]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,138,0,0.12),transparent_34%),radial-gradient(circle_at_top_right,rgba(18,60,140,0.14),transparent_38%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(240,136,62,0.08),transparent_38%),radial-gradient(circle_at_top_right,rgba(88,166,255,0.08),transparent_42%)]" />

        <div className="relative z-10 grid min-h-dvh w-full grid-cols-1 lg:grid-cols-2">
          <div className="login-enter relative flex flex-col px-6 py-7 md:px-12 lg:justify-between lg:px-20 lg:py-14">
            <div className="relative z-10">
              <div className="login-logo-pop flex items-center gap-4">
                <div className="flex h-12 min-h-12 w-12 min-w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#edf2f8] p-2 shadow-xl shadow-slate-300/45 md:h-14 md:w-14">
                  <Image
                    src={companyLogo}
                    alt={`${companyName} Logo`}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>

                <div>
                  <h1 className="text-xl font-black tracking-tight text-slate-950 dark:text-slate-100 md:text-2xl">
                    {companyName}
                  </h1>
                </div>
              </div>

              <div className="relative mt-8 max-w-2xl md:mt-12 lg:mt-20">
                <p
                  className="login-text-reveal text-xs font-black uppercase tracking-[0.35em] text-[#123c8c] dark:text-[#58a6ff] md:text-sm"
                  style={{
                    animationDelay: "120ms",
                  }}
                >
                  Selamat Datang
                </p>

                <h2
                  className="login-text-reveal mt-4 text-4xl font-black leading-[1.05] tracking-tight text-slate-950 dark:text-slate-100 md:mt-5 md:text-6xl"
                  style={{
                    animationDelay: "180ms",
                  }}
                >
                  <span className="typewriter-title login-presence-title">
                    Presensi Creativemu
                  </span>
                </h2>

                <p
                  className="login-text-reveal mt-5 text-lg font-black tabular-nums tracking-[0.16em] text-[#123c8c] dark:text-blue-300 md:text-2xl"
                  style={{
                    animationDelay: "240ms",
                  }}
                >
                  {currentTime || "--:--:--"} WIB
                </p>
              </div>
            </div>

            <div
              className="login-field-enter relative z-10 mt-10 hidden text-sm font-semibold text-slate-400 lg:block"
              style={{
                animationDelay: "280ms",
              }}
            >
              © 2026 Presensi for Creativemu
            </div>
          </div>

          <div className="flex items-start justify-center px-6 pb-8 pt-2 md:px-12 md:pb-12 lg:items-center lg:px-20 lg:py-14">
            <AppCard
              padding="lg"
              className="login-card-enter w-full max-w-md border-[#c8d3e2] bg-[#e6edf6]/92 shadow-2xl shadow-slate-300/40 backdrop-blur-2xl"
            >
              <form suppressHydrationWarning noValidate onSubmit={handleSubmit}>
                <div className="login-field-enter mb-7 md:mb-8">
                  <h3 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-slate-100">
                    Masuk
                  </h3>
                </div>

                <div className="space-y-5">
                  <div
                    className="login-field-enter login-field-smooth"
                    style={{
                      animationDelay: "80ms",
                    }}
                  >
                    <AppInput
                      suppressHydrationWarning
                      label="Email"
                      type="text"
                      inputMode="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="nama@creativemu.co.id"
                      autoComplete="email"
                      disabled={formIsBusy}
                      className="border-[#c8d3e2] bg-[#e9eff7] text-slate-700 placeholder:text-slate-400 focus:border-[#123c8c] focus:bg-[#edf3fa] focus:ring-blue-100/40 dark:border-[#30363d] dark:bg-[#111823] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#58a6ff] dark:focus:bg-[#111823] dark:focus:ring-[#1f6feb]/25"
                    />
                  </div>

                  <div
                    className="login-field-enter login-field-smooth"
                    style={{
                      animationDelay: "130ms",
                    }}
                  >
                    <AppInput
                      suppressHydrationWarning
                      label="Kata Sandi"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      autoComplete="current-password"
                      disabled={formIsBusy}
                      className="border-[#c8d3e2] bg-[#e9eff7] text-slate-700 placeholder:text-slate-400 focus:border-[#123c8c] focus:bg-[#edf3fa] focus:ring-blue-100/40 dark:border-[#30363d] dark:bg-[#111823] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-[#58a6ff] dark:focus:bg-[#111823] dark:focus:ring-[#1f6feb]/25"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <div
                    className="login-field-enter"
                    style={{
                      animationDelay: "180ms",
                    }}
                  >
                    <AppButton
                      type="submit"
                      full
                      disabled={formIsBusy}
                      leftIcon={<LogIn size={18} />}
                    >
                      {loginRetrySeconds > 0 ? (
                        `Tunggu ${loginRetrySeconds} detik`
                      ) : isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        "Masuk"
                      )}
                    </AppButton>
                  </div>
                </div>
              </form>
            </AppCard>
          </div>

          <div
            className="login-field-enter px-6 pb-6 text-xs font-semibold text-slate-400 lg:hidden"
            style={{
              animationDelay: "300ms",
            }}
          >
            © 2026 Presensi for Creativemu
          </div>
        </div>

        <FloatingAlert
          open={alert.open}
          title={alert.title}
          message={alertMessage}
          onClose={closeAlert}
        />
      </section>
    </MobileShell>
  );
}
