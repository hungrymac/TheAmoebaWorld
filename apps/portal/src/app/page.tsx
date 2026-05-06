import Link from "next/link";

import { Button } from "@amoeba/ui/components/button";
import { ThemeToggle } from "@amoeba/ui/components/theme-toggle";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="absolute end-4 top-4">
        <ThemeToggle />
      </div>
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
