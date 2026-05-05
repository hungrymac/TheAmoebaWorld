import Link from "next/link";

import { Button } from "@amoeba/ui/components/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Amoeba SaaS Platform
        </h1>
        <p className="mt-2 text-muted-foreground">
          ポータルへ進むにはログインしてください。
        </p>
      </div>
      <div className="flex gap-3">
        <Button asChild>
          <Link href="/login">ログイン</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/signup">サインアップ</Link>
        </Button>
      </div>
    </main>
  );
}
