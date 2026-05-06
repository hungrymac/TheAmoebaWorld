import type { Metadata } from "next";

import { ThemeProvider } from "@amoeba/ui/components/theme-provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "管理会計 — Amoeba",
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
