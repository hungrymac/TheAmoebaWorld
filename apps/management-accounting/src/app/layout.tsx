import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "管理会計 — Amoeba",
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
