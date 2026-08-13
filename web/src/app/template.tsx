"use client";

import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="animate-page-fade-in w-full flex-1 flex flex-col">
      {children}
    </div>
  );
}
