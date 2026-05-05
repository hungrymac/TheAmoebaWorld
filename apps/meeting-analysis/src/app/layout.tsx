import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "会議分析 — Amoeba",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
