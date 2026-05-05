import Link from "next/link";

import { Button } from "@amoeba/ui/components/button";

export default function MeetingAnalysisHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-semibold">会議分析モジュール</h1>
      <p className="text-muted-foreground">
        共通 UI（@amoeba/ui）を参照したスタブです。
      </p>
      <Button variant="outline" asChild>
        <Link href="http://localhost:3000">ポータルへ</Link>
      </Button>
    </main>
  );
}
