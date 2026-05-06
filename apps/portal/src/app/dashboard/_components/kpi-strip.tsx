import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type { MockKpi } from "@/lib/dashboard/mock-tenant";

type KpiStripProps = {
  items: MockKpi[];
};

function TrendIcon({ trend }: { trend: MockKpi["trend"] }) {
  if (trend === "up") {
    return <ArrowUpRight className="size-4 text-emerald-600 dark:text-emerald-400" />;
  }
  if (trend === "down") {
    return <ArrowDownRight className="size-4 text-rose-600 dark:text-rose-400" />;
  }
  return <Minus className="size-4 text-muted-foreground" />;
}

export function KpiStrip({ items }: KpiStripProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((kpi) => (
        <div
          key={kpi.label}
          className="group relative overflow-hidden rounded-xl border bg-kpi-tile-gradient p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium text-muted-foreground">{kpi.label}</p>
            <TrendIcon trend={kpi.trend} />
          </div>
          <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
            {kpi.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{kpi.delta}</p>
        </div>
      ))}
    </div>
  );
}
