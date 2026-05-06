import { setActiveTenant } from "@/actions/tenant";
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

type TenantPanelProps = {
  activeTenantId: string | undefined;
  seatCount: number;
};

export function TenantPanel({ activeTenantId, seatCount }: TenantPanelProps) {
  return (
    <Card className="border-muted-translucent shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">テナントとメンバー</CardTitle>
        <CardDescription>
          本番では{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            common.tenant_memberships
          </code>{" "}
          に基づき一覧から選択します。現段階は Cookie（HttpOnly）に UUID を保存します。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-6 text-sm">
          <div>
            <p className="text-muted-foreground">アクティブ tenant_id</p>
            <p className="mt-1 font-mono text-xs break-all text-foreground sm:text-sm">
              {activeTenantId ?? "（未設定）"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">シート数（モック）</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">
              {activeTenantId ? seatCount : "—"}
            </p>
          </div>
        </div>
        <form action={setActiveTenant} className="flex max-w-lg flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="tenantId">テナント ID（UUID）</Label>
            <Input
              id="tenantId"
              name="tenantId"
              placeholder="00000000-0000-4000-8000-000000000000"
              defaultValue={activeTenantId}
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            テナントを適用
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
