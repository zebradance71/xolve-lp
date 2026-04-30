import type { ReactNode } from "react";
import { LpBackgroundGlow } from "@/components/landing/LpBackgroundGlow";
import { LpTopNav } from "@/components/landing/LpTopNav";
import { cn } from "@/lib/utils";

type LpShellProps = {
  children: ReactNode;
  /** Outer wrapper below nav (e.g. max-width + padding) */
  className?: string;
  showNav?: boolean;
};

export function LpShell({ children, className, showNav = true }: LpShellProps) {
  return (
    <main
      className={cn(
        "min-h-screen min-w-0 overflow-x-hidden bg-[#000B18] font-sans tracking-tight text-zinc-100"
      )}
    >
      <LpBackgroundGlow />
      {showNav ? <LpTopNav /> : null}
      <div className={cn(className)}>{children}</div>
    </main>
  );
}
