# Amoeba SaaS Platform

モノレポ（pnpm / Turborepo）で複数アプリと共通基盤を束ねるポータル型 SaaS の初期構成です。

## 構成

| パス                         | 役割                                                              |
| ---------------------------- | ----------------------------------------------------------------- |
| `apps/portal`                | 認証・テナント切り替えの基盤（Next.js App Router + Supabase SSR） |
| `apps/meeting-analysis`      | 会議分析モジュール（スタブ）                                      |
| `apps/management-accounting` | 管理会計モジュール（スタブ）                                      |
| `packages/ui`                | Shadcn 互換の共通 UI（Tailwind v4）                               |
| `packages/db`                | Drizzle ORM によるスキーマ（`common` / `meeting` / `accounting`） |
| `supabase/migrations`        | Postgres スキーマ分割・RLS のマイグレーション SQL                 |

## セットアップ

1. Node 22 以上、`pnpm` を利用してください。
2. ルートで `pnpm install` を実行します。
3. `.env.example` を参考に、`apps/portal/.env.local` に Supabase の URL と publishable（anon）キーを設定します。ダッシュボードのモジュールリンクは任意で `NEXT_PUBLIC_MEETING_APP_URL` / `NEXT_PUBLIC_ACCOUNTING_APP_URL` を設定できます（未設定時は localhost:3001 / 3002）。
4. Supabase に `supabase/migrations/20260505120000_init_amoeba_schemas.sql` を適用します（CLI の `db push` または SQL エディタ）。
5. `pnpm dev` で PoC を起動します（既定では portal がポート 3000）。

## 開発コマンド

- `pnpm dev` — 全パッケージの dev（Turbo）
- `pnpm build` — ビルド
- `pnpm lint` — 全パッケージの ESLint
- `pnpm test` — 全パッケージのテスト（共有パッケージは Vitest）
- `pnpm format` / `pnpm format:check` — Prettier
- `pnpm --filter @amoeba/portal dev` — ポータルのみ

開発方針（行数目安・セキュリティ・テストの期待値）は [docs/ENGINEERING.md](./docs/ENGINEERING.md) を参照してください。

## セキュリティメモ（マルチテナント）

- RLS は **所属テナント**（`common.tenant_memberships`）に基づき、`tenant_id` で隔離します。
- `user_metadata` はユーザー編集可能なため、認可判定には使いません。テナント ID を JWT に載せる場合は **`app_metadata`**（サーバー側でのみ更新）を利用してください。
- `packages/db` の `createDb` はサーバー専用です。ブラウザには publishable キーと Supabase クライアントのみを渡します。
