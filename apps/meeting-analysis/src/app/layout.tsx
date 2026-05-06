import type { Metadata } from "next";

import { ThemeProvider } from "@amoeba/ui/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "会議分析 — Amoeba",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
