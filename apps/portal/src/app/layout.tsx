import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Amoeba Platform — Portal",
  description: "認証・テナント管理・アプリランチャー",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
