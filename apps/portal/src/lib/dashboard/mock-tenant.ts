/**
 * Deterministic mock workspace data for dashboard demos.
 * Replace with Supabase + RLS-backed queries when wiring real tenants.
 */

export type MockKpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
};

export type MockModule = {
  id: "meeting" | "accounting";
  title: string;
  description: string;
  href: string;
  statLabel: string;
  statValue: string;
  badge: string;
};

export type MockActivity = {
  id: string;
  title: string;
  meta: string;
  tone: "meeting" | "accounting" | "system";
};

export type MockWorkspaceState = {
  tenantId: string | null;
  orgName: string;
  orgSlug: string;
  planLabel: string;
  seatCount: number;
  kpis: MockKpi[];
  modules: MockModule[];
  activities: MockActivity[];
};

const ORG_NAMES = [
  "アメーバ商事株式会社",
  "京都ラボ合同会社",
  "大阪デジタル事業部",
  "中部プロセス改善室",
  "福岡グロースカンパニー",
];

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length]!;
}

export function getMockWorkspaceState(
  activeTenantId: string | undefined,
): MockWorkspaceState {
  const tenantId = activeTenantId?.trim() || null;
  const seed = tenantId ? hashString(tenantId) : 0;
  const orgName = tenantId
    ? pick(ORG_NAMES, seed)
    : "（テナント未選択 — 下のフォームで UUID を設定）";
  const orgSlug = tenantId ? `tenant-${tenantId.slice(0, 8)}` : "no-tenant";
  const seatCount = tenantId ? 12 + (seed % 48) : 0;

  const kpis: MockKpi[] = tenantId
    ? [
        {
          label: "粗利益（当月・モック）",
          value: `${(8.2 + (seed % 120) / 10).toFixed(1)} 億円`,
          delta: seed % 2 === 0 ? "+4.1% 先月比" : "+1.2% 先月比",
          trend: seed % 3 === 0 ? "down" : "up",
        },
        {
          label: "会議インサイト件数",
          value: `${24 + (seed % 40)}`,
          delta: "直近7日",
          trend: "flat",
        },
        {
          label: "アラート（要フォロー）",
          value: `${2 + (seed % 5)}`,
          delta: "経営会議タグ",
          trend: seed % 4 === 0 ? "up" : "flat",
        },
      ]
    : [
        {
          label: "粗利益（当月・モック）",
          value: "—",
          delta: "テナント選択後に表示",
          trend: "flat",
        },
        {
          label: "会議インサイト件数",
          value: "—",
          delta: "同上",
          trend: "flat",
        },
        {
          label: "アラート（要フォロー）",
          value: "—",
          delta: "同上",
          trend: "flat",
        },
      ];

  const meetingBase =
    process.env.NEXT_PUBLIC_MEETING_APP_URL ?? "http://localhost:3001";
  const accountingBase =
    process.env.NEXT_PUBLIC_ACCOUNTING_APP_URL ?? "http://localhost:3002";

  const modules: MockModule[] = [
    {
      id: "meeting",
      title: "会議分析",
      description:
        "録画・文字起こしからアクション項目とリスクを抽出。管理会計の科目と紐付け予定。",
      href: meetingBase,
      statLabel: "今週の要約ドラフト",
      statValue: tenantId ? `${6 + (seed % 8)} 件` : "—",
      badge: "Preview",
    },
    {
      id: "accounting",
      title: "管理会計",
      description:
        "部門別損益とアメーバ実績のダッシュボード。会議側の示唆とクロス参照できます。",
      href: accountingBase,
      statLabel: "確定済み伝票（モック）",
      statValue: tenantId ? `${180 + (seed % 90)} 件` : "—",
      badge: "Preview",
    },
  ];

  const activities: MockActivity[] = tenantId
    ? [
        {
          id: "a1",
          title: "四半期レビュー — 営業利益の乖離要因を自動タグ付け",
          meta: "会議分析 · 2時間前",
          tone: "meeting",
        },
        {
          id: "a2",
          title: "製造部門の限界利益率が閾値を下回りました",
          meta: "管理会計 · 昨日",
          tone: "accounting",
        },
        {
          id: "a3",
          title: "新規メンバー3名がテナントに参加（招待承認済み）",
          meta: "ポータル · 3日前",
          tone: "system",
        },
      ]
    : [
        {
          id: "b1",
          title: "テナントを選択すると、直近のアクティビティがここに表示されます",
          meta: "モック",
          tone: "system",
        },
      ];

  return {
    tenantId,
    orgName,
    orgSlug,
    planLabel: tenantId ? "Business（モック）" : "—",
    seatCount,
    kpis,
    modules,
    activities,
  };
}
