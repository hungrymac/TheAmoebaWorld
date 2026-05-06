import Link from "next/link";

import { signInWithPassword } from "@/actions/auth";
import { Button } from "@amoeba/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@amoeba/ui/components/card";
import { Input } from "@amoeba/ui/components/input";
import { Label } from "@amoeba/ui/components/label";
import { ThemeToggle } from "@amoeba/ui/components/theme-toggle";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="absolute end-4 top-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
          <CardDescription>
            Supabase Auth のメール／パスワードでサインインします。
          </CardDescription>
        </CardHeader>
        <form action={signInWithPassword}>
          <CardContent className="space-y-4">
            {params.error ? (
              <p className="text-sm text-destructive">{params.error}</p>
            ) : null}
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button type="submit">ログイン</Button>
            <Button variant="link" className="px-0" asChild>
              <Link href="/signup">アカウント作成</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
