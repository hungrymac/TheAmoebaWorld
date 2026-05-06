import Link from "next/link";

import { Button } from "@amoeba/ui/components/button";
import { ThemeToggle } from "@amoeba/ui/components/theme-toggle";

export default function ManagementAccountingHome() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="absolute end-4 top-4">
        <ThemeToggle />
      </div>
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
