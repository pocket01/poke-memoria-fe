# 1. 依存関係のインストール（開発用）
FROM node:24.13.0-alpine3.23 AS deps

# パッケージマネージャーを最新版に
RUN npm install -g npm@latest

# ビルドツールエージェントをインストール
RUN npm install -g pnpm@10.28.2

# CVE脆弱性対応
RUN npm install -g glob@latest tar@latest

WORKDIR /app

# pnpmのワークスペース設定と依存関係ファイルのみコピー（キャッシュ効率化）
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# 2. ビルド
FROM node:24.13.0-alpine3.23 AS builder

# パッケージマネージャーを最新版に
RUN npm install -g npm@latest

# ビルドツールエージェントをインストール
RUN npm install -g pnpm@10.28.2

# CVE脆弱性対応
RUN npm install -g glob@latest tar@latest

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.jsのスタンドアロンビルド
RUN pnpm run build

# 3. 実行用
FROM node:24.13.0-alpine3.23 AS runner

# CVE脆弱性対応
RUN npm install -g glob@latest tar@latest

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 8080
CMD ["node", "server.js"]