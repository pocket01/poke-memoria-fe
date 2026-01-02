# 1. ビルドステージ（依存関係インストール + Next.jsビルド）
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate

# CI環境変数を設定（pnpmのTTYエラー回避）
ENV CI=true

WORKDIR /app

# ソースコードをコピー
COPY . .

# 依存関係のインストール
RUN pnpm install --frozen-lockfile

# Next.jsスタンドアロンビルド
RUN pnpm run build

# 2. 実行ステージ（最小イメージ）
FROM node:20-alpine AS runner
WORKDIR /app

# standaloneビルドの成果物をコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080
CMD ["node", "server.js"]