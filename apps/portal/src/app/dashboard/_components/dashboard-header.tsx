import Link from "next/link";

import { signOut } from "@/actions/auth";
import { ThemeToggle } from "@amoeba/ui/components/theme-toggle";
import { Button } from "@amoeba/ui/components/button";

type DashboardHeaderProps = {
  userLabel: string;
  orgName: string;
  orgSlug: string;
  planLabel: string;
};

export function DashboardHeader({
  userLabel,
  orgName,
  orgSlug,
  planLabel,
}: DashboardHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-2xl border bg-card-translucent p-6 shadow-sm backdrop-blur-sm sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25"
        aria-hidden
      >
        <div className="absolute -end-24 -top-24 size-72 rounded-full bg-primary-translucent-15 blur-3xl" />
        <div className="absolute -bottom-20 -start-16 size-64 rounded-full bg-muted-foreground-translucent-10 blur-3xl" />
      </div>
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {orgName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-mono text-xs text-foreground-translucent-80">
              @{orgSlug}
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>{planLabel}</span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span className="truncate">{userLabel}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" asChild>
            <Link href="/">ホーム</Link>
          </Button>
          <form action={signOut}>
            <Button type="submit" variant="secondary" size="sm">
              ログアウト
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
