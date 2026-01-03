# 1. 依存関係のインストール（開発用）
FROM node:22.21.1-alpine AS deps
RUN npm install -g pnpm@10.27.0

WORKDIR /app

# pnpmのワークスペース設定と依存関係ファイルのみコピー（キャッシュ効率化）
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 2. ビルド
FROM node:22.21.1-alpine AS builder
RUN npm install -g pnpm@10.27.0
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.jsのスタンドアロンビルド
RUN pnpm run build

# 3. 実行用
FROM node:22.21.1-alpine AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080
CMD ["node", "server.js"]