import Link from "next/link";
import { BarChart3, ChevronRight, Mic2 } from "lucide-react";

import type { MockModule } from "@/lib/dashboard/mock-tenant";
import { Button } from "@amoeba/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@amoeba/ui/components/card";

type ModuleLauncherProps = {
  modules: MockModule[];
};

function ModuleIcon({ id }: { id: MockModule["id"] }) {
  if (id === "meeting") {
    return (
      <span className="flex size-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300">
        <Mic2 className="size-5" aria-hidden />
      </span>
    );
  }
  return (
    <span className="flex size-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-300">
      <BarChart3 className="size-5" aria-hidden />
    </span>
  );
}

export function ModuleLauncher({ modules }: ModuleLauncherProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {modules.map((mod) => (
        <Card
          key={mod.id}
          className="overflow-hidden border-muted-translucent shadow-sm transition-shadow hover:shadow-md"
        >
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
            <ModuleIcon id={mod.id} />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg">{mod.title}</CardTitle>
                <span className="rounded-full border border-dashed px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                  {mod.badge}
                </span>
              </div>
              <CardDescription className="text-pretty">
                {mod.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="rounded-lg border bg-muted-translucent-40 px-4 py-3">
              <p className="text-xs text-muted-foreground">{mod.statLabel}</p>
              <p className="text-lg font-semibold tabular-nums">{mod.statValue}</p>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted-translucent-20 pt-4">
            <Button variant="default" className="w-full sm:w-auto" asChild>
              <Link href={mod.href} target="_blank" rel="noreferrer">
                モジュールを開く
                <ChevronRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
