type MobileShellProps = {
  children: React.ReactNode;
  withBottomPadding?: boolean;
  variant?: "auth" | "employee" | "admin";
};

export default function MobileShell({
  children,
  withBottomPadding = true,
  variant = "employee",
}: MobileShellProps) {
  const shellClass = {
    auth: "min-h-dvh w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]",
    employee: "min-h-dvh w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]",
    admin: "min-h-dvh w-full overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]",
  };

  const paddingClass =
    withBottomPadding && variant !== "admin" ? "pb-28 md:pb-8" : "";

  return (
    <main className={shellClass[variant]}>
      <div
        className={[
          withBottomPadding ? "pb-28 md:pb-8" : "",
          variant === "admin" ? "md:pl-64" : "",
        ].join(" ")}
      >
        {children}
      </div>
    </main>
  );
}
