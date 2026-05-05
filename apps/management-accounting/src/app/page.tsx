import Link from "next/link";

import { Button } from "@amoeba/ui/components/button";

export default function ManagementAccountingHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-semibold">管理会計モジュール</h1>
      <p className="text-muted-foreground">
        共通 DB スキーマ（accounting.*）と連携する前提のスタブです。
      </p>
      <Button variant="outline" asChild>
        <Link href="http://localhost:3000">ポータルへ</Link>
      </Button>
    </main>
  );
}
