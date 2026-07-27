"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastMessage = {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
};

declare global {
  interface Window {
    showToast?: (toast: Omit<ToastMessage, "id">) => void;
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    window.showToast = (toast) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastMessage = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-white p-4 shadow-2xl border border-slate-100 transition-all duration-300 animate-slideInRight"
        >
          {toast.type === "success" && (
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          )}
          {toast.type === "error" && (
            <XCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
          )}
          {toast.type === "warning" && (
            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          )}
          {toast.type === "info" && (
            <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <h4 className="text-xs font-black text-slate-900">{toast.title}</h4>
            {toast.message && (
              <p className="mt-1 text-xs font-medium text-slate-500 leading-relaxed">
                {toast.message}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
