import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/actions/auth";
import { setActiveTenant } from "@/actions/tenant";
import { getActiveTenantId } from "@/lib/tenant/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@amoeba/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@amoeba/ui/components/card";
import { Input } from "@amoeba/ui/components/input";
import { Label } from "@amoeba/ui/components/label";
import { ThemeToggle } from "@amoeba/ui/components/theme-toggle";

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const activeTenantId = await getActiveTenantId();

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-8 p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">ダッシュボード</h1>
          <p className="text-sm text-muted-foreground">
            ログイン中: {user.email ?? user.id}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/">ホーム</Link>
          </Button>
          <form action={signOut}>
            <Button type="submit" variant="secondary">
              ログアウト
            </Button>
          </form>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>テナント切り替え</CardTitle>
          <CardDescription>
            所属テナントは DB の{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              common.tenant_memberships
            </code>{" "}
            と照合してから選択させるのが原則です。現段階では UUID を直接指定して Cookie{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">{`HttpOnly`}</code>{" "}
            に保存します。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            現在のアクティブテナント:{" "}
            <span className="font-mono text-foreground">
              {activeTenantId ?? "（未設定）"}
            </span>
          </p>
          <form action={setActiveTenant} className="flex max-w-md flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="tenantId">テナント ID (UUID)</Label>
              <Input
                id="tenantId"
                name="tenantId"
                placeholder="00000000-0000-4000-8000-000000000000"
                defaultValue={activeTenantId}
              />
            </div>
            <Button type="submit">テナントを適用</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>アプリランチャー（プレースホルダ）</CardTitle>
          <CardDescription>
            Turborepo の各アプリは同一デザインシステム（@amoeba/ui）で統一します。
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button variant="outline" disabled>
            会議分析（apps/meeting-analysis）
          </Button>
          <Button variant="outline" disabled>
            管理会計（apps/management-accounting）
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
