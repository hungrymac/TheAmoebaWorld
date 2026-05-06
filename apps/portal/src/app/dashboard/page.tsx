import { redirect } from "next/navigation";

import { ActivityFeed } from "./_components/activity-feed";
import { DashboardHeader } from "./_components/dashboard-header";
import { KpiStrip } from "./_components/kpi-strip";
import { ModuleLauncher } from "./_components/module-launcher";
import { TenantPanel } from "./_components/tenant-panel";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getMockWorkspaceState } from "@/lib/dashboard/mock-tenant";
import { getActiveTenantId } from "@/lib/tenant/server";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const activeTenantId = await getActiveTenantId();
  const workspace = getMockWorkspaceState(activeTenantId);
  const userLabel = user.email ?? user.id;

  return (
    <div className="min-h-screen bg-shell-gradient">
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <DashboardHeader
          userLabel={userLabel}
          orgName={workspace.orgName}
          orgSlug={workspace.orgSlug}
          planLabel={workspace.planLabel}
        />

        <section aria-labelledby="kpi-heading" className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2
                id="kpi-heading"
                className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
              >
                ハイライト
              </h2>
              <p className="text-balance text-lg font-medium tracking-tight">
                テナントに紐づくモック KPI
              </p>
            </div>
            <p className="max-w-md text-right text-xs text-muted-foreground">
              実データ接続後は管理会計・会議分析の集計ビューをここに載せ替えます。
            </p>
          </div>
          <KpiStrip items={workspace.kpis} />
        </section>

        <section aria-labelledby="modules-heading" className="space-y-4">
          <div>
            <h2
              id="modules-heading"
              className="text-sm font-semibold uppercase tracking-wide text-muted-foreground"
            >
              アプリランチャー
            </h2>
            <p className="text-balance text-lg font-medium tracking-tight">
              モジュールへ
            </p>
          </div>
          <ModuleLauncher modules={workspace.modules} />
        </section>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="space-y-8 lg:col-span-3">
            <ActivityFeed items={workspace.activities} />
          </div>
          <div className="lg:col-span-2">
            <TenantPanel
              activeTenantId={workspace.tenantId ?? undefined}
              seatCount={workspace.seatCount}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
