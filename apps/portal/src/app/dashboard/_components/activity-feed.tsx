import { Activity, Landmark, Sparkles } from "lucide-react";

import type { MockActivity } from "@/lib/dashboard/mock-tenant";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@amoeba/ui/components/card";

type ActivityFeedProps = {
  items: MockActivity[];
};

function ToneIcon({ tone }: { tone: MockActivity["tone"] }) {
  if (tone === "meeting") {
    return <Sparkles className="size-4 text-violet-500" aria-hidden />;
  }
  if (tone === "accounting") {
    return <Landmark className="size-4 text-sky-500" aria-hidden />;
  }
  return <Activity className="size-4 text-muted-foreground" aria-hidden />;
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <Card className="border-muted-translucent shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">直近のアクティビティ</CardTitle>
        <CardDescription>
          会議分析と管理会計からのモック通知です。本番ではイベントストリームやジョブ結果に差し替えます。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-0 divide-y rounded-b-xl border-t bg-muted-translucent-10 px-0 pb-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-3 px-6 py-4 first:pt-5 last:pb-5 hover:bg-muted-translucent-30"
          >
            <div className="mt-0.5 shrink-0">
              <ToneIcon tone={item.tone} />
            </div>
            <div className="min-w-0 space-y-1">
              <p className="text-sm font-medium leading-snug">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.meta}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
