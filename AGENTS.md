# AGENTS.md

## Cursor Cloud specific instructions

### サービス概要

pnpm + Turborepo モノレポで構成されたマルチテナント SaaS ポータル。詳細は `README.md` と `docs/ENGINEERING.md` を参照。

| サービス                       | ポート      | 起動コマンド                                      |
| ------------------------------ | ----------- | ------------------------------------------------- |
| Portal (メイン)                | 3000        | `pnpm --filter @amoeba/portal dev`                |
| Meeting Analysis (スタブ)      | 3001        | `pnpm --filter @amoeba/meeting-analysis dev`      |
| Management Accounting (スタブ) | 3002        | `pnpm --filter @amoeba/management-accounting dev` |
| Supabase (Auth + Postgres)     | 54321/54322 | `npx supabase start`                              |

全サービス一括起動: `pnpm dev`（Turborepo 経由で 3 アプリ同時起動）

### 開発コマンド

`README.md` の「開発コマンド」セクション参照（`pnpm lint` / `pnpm test` / `pnpm build` / `pnpm format:check`）。

### ローカル Supabase の注意点

- Docker が必要。Cloud Agent 環境では `sudo dockerd` でデーモンを起動してから `npx supabase start` を実行する。
- `supabase start` 時にマイグレーション（`supabase/migrations/`）が自動適用される。`supabase db push` は不要。
- `npx supabase status` で API URL やキーを確認可能。
- ローカルの anon key は `sb_publishable_...` 形式（`supabase start` の出力を確認）。
- `apps/portal/.env.local` に `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL` を設定する。テンプレートは `.env.example` を参照。
- ローカル Supabase ではメール確認が無効（`enable_confirmations = false`）なので、サインアップ直後にログイン可能。

### pnpm ホイスティング

`.npmrc` で `public-hoist-pattern[]=*eslint*` を設定している。これがないと `eslint-config-next` が `eslint-plugin-react-hooks` を解決できず `pnpm lint` が失敗する。
