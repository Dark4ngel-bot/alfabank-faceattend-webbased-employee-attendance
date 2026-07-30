"use client";

import { useRef, useState } from "react";
import {
  Download,
  X,
  ShieldCheck,
  Building2,
  MapPin,
  IdCard,
  Printer,
  QrCode,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type EmployeeIdCardModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    employee_code?: string | null;
    nik?: string | null;
    role?: string | null;
    employment_status?: string | null;
    profile_photo?: string | null;
    registered_office?: { name: string; address?: string | null } | null;
    department?: { name: string } | null;
    jabatan?: { name: string } | null;
    position?: { name: string } | null;
  };
};

export function EmployeeIdCardModal({
  isOpen,
  onClose,
  user,
}: EmployeeIdCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");

  if (!isOpen) return null;

  const employeeId = user.employee_code || user.nik || "CR-88910";
  const positionName =
    user.position?.name || user.jabatan?.name || "Karyawan Creativemu";
  const departmentName = user.department?.name || "Creative Agency";
  const officeName = user.registered_office?.name || "Headquarters Jakarta";
  const employmentStatus = user.employment_status || "Karyawan Tetap";

  async function handleDownloadPNG() {
    try {
      setIsDownloading(true);

      // Create a canvas drawing representation of the card
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = 800;
      const height = 1200;
      canvas.width = width;
      canvas.height = height;

      // Draw background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#0b2559");
      bgGrad.addColorStop(0.5, "#123c8c");
      bgGrad.addColorStop(1, "#071b42");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Decorative top arc
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.beginPath();
      ctx.arc(width / 2, -100, 550, 0, Math.PI * 2);
      ctx.fill();

      // Header Brand
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 36px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("CREATIVEMU AGENCY", width / 2, 90);

      ctx.fillStyle = "#60a5fa";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("OFFICIAL EMPLOYEE IDENTIFICATION CARD", width / 2, 130);

      // Card Header Divider Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(80, 160);
      ctx.lineTo(width - 80, 160);
      ctx.stroke();

      // Photo Frame Box
      const photoSize = 260;
      const photoX = (width - photoSize) / 2;
      const photoY = 210;

      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.roundRect(photoX, photoY, photoSize, photoSize, 40);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Photo or Avatar initials
      if (user.profile_photo) {
        try {
          const img = new Image();
          img.crossOrigin = "anonymous";
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = user.profile_photo!;
          });
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(photoX + 8, photoY + 8, photoSize - 16, photoSize - 16, 32);
          ctx.clip();
          ctx.drawImage(img, photoX + 8, photoY + 8, photoSize - 16, photoSize - 16);
          ctx.restore();
        } catch {
          // Fallback Initials
          ctx.fillStyle = "#123c8c";
          ctx.font = "900 80px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            user.name.slice(0, 2).toUpperCase(),
            width / 2,
            photoY + photoSize / 2
          );
        }
      } else {
        ctx.fillStyle = "#123c8c";
        ctx.font = "900 80px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          user.name.slice(0, 2).toUpperCase(),
          width / 2,
          photoY + photoSize / 2
        );
      }

      ctx.textBaseline = "alphabetic";

      // Employee Name
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 42px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(user.name, width / 2, 530);

      // Position
      ctx.fillStyle = "#93c5fd";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText(positionName, width / 2, 575);

      // Status Pill
      ctx.fillStyle = "#1e40af";
      ctx.beginPath();
      ctx.roundRect((width - 240) / 2, 605, 240, 48, 24);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText(`• ${employmentStatus} •`, width / 2, 636);

      // Info Table Container
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      ctx.beginPath();
      ctx.roundRect(80, 680, width - 160, 320, 28);
      ctx.fill();

      ctx.textAlign = "left";

      // Info Row 1: ID Code
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("NO INDUK KARYAWAN", 120, 730);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 24px sans-serif";
      ctx.fillText(employeeId, 120, 765);

      // Info Row 2: Department
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("DIVISI", 460, 730);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 24px sans-serif";
      ctx.fillText(departmentName, 460, 765);

      // Info Row 3: Registered Office
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("KANTOR PENEMPATAN", 120, 830);

      ctx.fillStyle = "#ffffff";
      ctx.font = "900 24px sans-serif";
      ctx.fillText(officeName, 120, 865);

      // Info Row 4: Validity
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("STATUS VERIFIKASI", 460, 830);

      ctx.fillStyle = "#4ade80";
      ctx.font = "900 24px sans-serif";
      ctx.fillText("VERIFIED ACTIVE", 460, 865);

      // Bottom Barcode / Security Stamp
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`ID-HASH: ${btoa(employeeId).slice(0, 16)}`, width / 2, 955);

      // Footer Note
      ctx.fillStyle = "#64748b";
      ctx.font = "18px sans-serif";
      ctx.fillText(
        "Kartu Tanda Karyawan Resmi CV Creativemu Agency",
        width / 2,
        1110
      );
      ctx.fillText("Diterbitkan Secara Digital & Sah Gunakan Presensi", width / 2, 1140);

      // Convert to PNG & Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Kartu_Karyawan_${user.name.replace(/\s+/g, "_")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("DOWNLOAD_ID_CARD_ERROR:", err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#0b2559] via-[#123c8c] to-[#071b42] p-6 text-white shadow-2xl ring-1 ring-white/20 md:p-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-300">
            <Sparkles size={16} className="text-amber-300" />
            Kartu Identitas Digital
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Side Selector Tabs */}
        <div className="mt-4 flex rounded-2xl bg-white/10 p-1 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setActiveSide("front")}
            className={`flex-1 rounded-xl py-2 text-xs font-black transition ${
              activeSide === "front"
                ? "bg-white text-[#123c8c] shadow-md"
                : "text-white/80 hover:text-white"
            }`}
          >
            Tampak Depan (ID Card)
          </button>
          <button
            type="button"
            onClick={() => setActiveSide("back")}
            className={`flex-1 rounded-xl py-2 text-xs font-black transition ${
              activeSide === "back"
                ? "bg-white text-[#123c8c] shadow-md"
                : "text-white/80 hover:text-white"
            }`}
          >
            Tampak Belakang (QR Code)
          </button>
        </div>

        {/* ID Card Display Area (Fit-Page, No Scroll) */}
        <div className="my-auto py-4">
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/15 via-white/5 to-white/10 p-6 shadow-xl backdrop-blur-xl"
          >
            {/* Hologram Accent Line */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400/30 via-blue-500/20 to-purple-500/30 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-gradient-to-br from-amber-400/20 via-blue-500/20 to-indigo-500/30 blur-2xl pointer-events-none" />

            {activeSide === "front" ? (
              <div className="flex flex-col items-center text-center">
                {/* Lanyard Slot Hole Accent */}
                <div className="mb-4 h-3 w-16 rounded-full bg-black/40 shadow-inner ring-1 ring-white/20" />

                {/* Company Logo / Header */}
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-[#123c8c] font-black text-sm shadow">
                    C
                  </div>
                  <span className="text-sm font-black tracking-wider text-white">
                    CREATIVEMU AGENCY
                  </span>
                </div>

                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-blue-200">
                  Kartu Tanda Karyawan Resmi
                </p>

                {/* Employee Photo */}
                <div className="relative mt-5">
                  <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white/30 bg-white/20 p-1 shadow-2xl">
                    {user.profile_photo ? (
                      <img
                        src={user.profile_photo}
                        alt={user.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-[#123c8c] text-2xl font-black text-white">
                        {user.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow ring-2 ring-[#123c8c]">
                    <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                </div>

                {/* Employee Name & Position */}
                <h3 className="mt-4 text-xl font-black tracking-tight text-white">
                  {user.name}
                </h3>
                <p className="mt-0.5 text-xs font-bold text-blue-200">
                  {positionName}
                </p>

                {/* Status Pill */}
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-500/30 px-3 py-1 text-[11px] font-black text-blue-100 ring-1 ring-blue-300/40">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  {employmentStatus}
                </span>

                {/* Details Grid */}
                <div className="mt-5 grid w-full grid-cols-2 gap-2 text-left rounded-2xl bg-black/20 p-3 text-xs border border-white/10">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400">NO INDUK</span>
                    <span className="font-black text-white">{employeeId}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400">DIVISI</span>
                    <span className="font-black text-white">{departmentName}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-white/10">
                    <span className="block text-[10px] font-bold text-slate-400">KANTOR</span>
                    <span className="font-black text-white truncate block">{officeName}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center py-2">
                <div className="mb-4 h-3 w-16 rounded-full bg-black/40 shadow-inner ring-1 ring-white/20" />

                <QrCode size={36} className="text-blue-300" />
                <h4 className="mt-2 text-sm font-black text-white">VERIFIKASI PRESENSI DIGITAL</h4>
                <p className="mt-1 text-xs text-blue-200">Pindai kode QR untuk memverifikasi keabsahan kartu ini</p>

                {/* Simulated High-Tech QR Canvas */}
                <div className="my-5 rounded-2xl bg-white p-4 shadow-2xl ring-4 ring-white/20">
                  <svg className="h-32 w-32" viewBox="0 0 100 100">
                    {/* Outer frame */}
                    <rect x="5" y="5" width="28" height="28" fill="#0f172a" rx="4" />
                    <rect x="9" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                    <rect x="13" y="13" width="12" height="12" fill="#123c8c" rx="1" />

                    <rect x="67" y="5" width="28" height="28" fill="#0f172a" rx="4" />
                    <rect x="71" y="9" width="20" height="20" fill="#ffffff" rx="2" />
                    <rect x="75" y="13" width="12" height="12" fill="#123c8c" rx="1" />

                    <rect x="5" y="67" width="28" height="28" fill="#0f172a" rx="4" />
                    <rect x="9" y="71" width="20" height="20" fill="#ffffff" rx="2" />
                    <rect x="13" y="75" width="12" height="12" fill="#123c8c" rx="1" />

                    {/* Data pattern */}
                    <rect x="38" y="10" width="8" height="8" fill="#0f172a" />
                    <rect x="50" y="10" width="8" height="8" fill="#123c8c" />
                    <rect x="38" y="24" width="20" height="8" fill="#0f172a" />
                    <rect x="10" y="38" width="8" height="20" fill="#123c8c" />
                    <rect x="24" y="44" width="16" height="8" fill="#0f172a" />
                    <rect x="44" y="44" width="12" height="12" fill="#123c8c" />
                    <rect x="62" y="38" width="28" height="8" fill="#0f172a" />
                    <rect x="70" y="50" width="14" height="8" fill="#123c8c" />
                    <rect x="38" y="68" width="12" height="12" fill="#0f172a" />
                    <rect x="54" y="76" width="16" height="8" fill="#123c8c" />
                    <rect x="74" y="68" width="16" height="16" fill="#0f172a" />
                  </svg>
                </div>

                <p className="font-mono text-xs font-bold tracking-widest text-blue-200">
                  ID: {employeeId}
                </p>
                <p className="mt-2 text-[10px] text-slate-400">
                  Kartu Identitas Digital Sah CV Creativemu Agency. Hak Cipta Dilindungi.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            disabled={isDownloading}
            onClick={handleDownloadPNG}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-xs font-black text-[#123c8c] shadow-lg transition hover:bg-blue-50 active:scale-98 disabled:opacity-50"
          >
            <Download size={16} strokeWidth={2.8} />
            {isDownloading ? "Membuat Kartu..." : "Download Kartu (PNG)"}
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center rounded-2xl bg-white/15 px-4 py-3.5 text-xs font-black text-white transition hover:bg-white/25 active:scale-98"
            title="Cetak / PDF"
          >
            <Printer size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
