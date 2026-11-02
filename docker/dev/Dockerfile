# 1. ビルドステージ（依存関係インストール + Next.jsビルド）
FROM node:24.22.2-alpine3.24 AS builder

# パッケージマネージャーを最新版に
RUN npm install -g npm@latest

# ビルドツールエージェントをインストール
RUN npm install -g pnpm@10.34.9

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
FROM node:24.22.2-alpine3.24 AS runner
RUN npm install -g npm@latest

WORKDIR /app

# standaloneビルドの成果物をコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080
CMD ["node", "server.js"]