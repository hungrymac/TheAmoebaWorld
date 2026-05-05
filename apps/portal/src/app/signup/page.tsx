import Link from "next/link";

import { signUpWithPassword } from "@/actions/auth";
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

type Props = {
  searchParams: Promise<{ error?: string; notice?: string }>;
};

export default async function SignupPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>サインアップ</CardTitle>
          <CardDescription>
            メール確認が有効な場合は、届いたリンクから認証を完了してください。
          </CardDescription>
        </CardHeader>
        <form action={signUpWithPassword}>
          <CardContent className="space-y-4">
            {params.error ? (
              <p className="text-sm text-destructive">{params.error}</p>
            ) : null}
            {params.notice === "confirm_email" ? (
              <p className="text-sm text-muted-foreground">
                確認メールを送信しました。メール内のリンクから続行してください。
              </p>
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
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button type="submit">登録</Button>
            <Button variant="link" className="px-0" asChild>
              <Link href="/login">ログインへ</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
