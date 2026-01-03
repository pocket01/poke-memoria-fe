# ポケメモリア CD仕様書
本ドキュメントは、ポケメモリア フロントエンドのCI/CDパイプライン、デプロイフロー、および運用手順を定義します。

---

## 1. 全体構成

### アーキテクチャ
- **開発環境**: Docker Compose（ローカル）
- **本番環境**: Google Cloud Platform
  - **コンテナレジストリ**: Artifact Registry
  - **ホスティング**: Cloud Run
  - **リージョン**: asia-northeast1（東京）

### 環境分類
| 環境 | 用途 | アクセス制限 |
|------|------|------------|
| **local** | ローカル開発 | localhost:3000 |
| **dev** | 開発検証環境 | 内部+CLB |
| **stg** | 検証環境 | 内部+CLB |
| **prod** | 本番環境 | 内部+CLB |

---

## 2. デプロイフロー

### 2.1 ローカル開発環境

#### 起動方法
```bash
pnpm docker:local
```

#### 構成
- **Docker Compose**: `docker/local/docker-compose.yml`
- **Dockerfile**: `docker/local/Dockerfile`
- **ターゲット**: `deps`（依存関係のみ）
- **ポート**: 3000
- **ホットリロード**: 有効

---

### 2.2 Cloud Run デプロイフロー（dev/stg/prod）

#### 全体フロー
```
1. Dockerイメージビルド
   ↓
2. Artifact Registryへプッシュ
   ↓
3. Cloud Runへデプロイ
```

#### 2.2.1 コマンド一覧

##### Dev環境
```bash
# 初回のみ：Artifact Registryリポジトリ作成
pnpm docker:dev:create-repo

# ビルドのみ
pnpm docker:dev:build

# プッシュのみ
pnpm docker:dev:push

# デプロイのみ
pnpm docker:dev:deploy

# ビルド→プッシュ→デプロイを一括実行
pnpm docker:dev
```

##### Stg環境
```bash
pnpm docker:stg:create-repo  # 初回のみ
pnpm docker:stg:build
pnpm docker:stg:push
pnpm docker:stg:deploy
pnpm docker:stg  # 一括実行
```

##### Prod環境
```bash
pnpm docker:prod:create-repo  # 初回のみ
pnpm docker:prod:build
pnpm docker:prod:push
pnpm docker:prod:deploy
pnpm docker:prod  # 一括実行
```

---

## 3. 環境変数管理

### 3.1 環境変数ファイル

各環境用の`.env`ファイルをプロジェクトルートに配置：

```
.env.dev    # dev環境用
.env.stg    # stg環境用
.env.prod   # prod環境用
```

### 3.2 必須環境変数

| 変数名 | 説明 | 例 |
|--------|------|-----|
| `DEPLOY_IMAGE_PROJECT_URL` | Artifact RegistryのプロジェクトURL | `asia-northeast1-docker.pkg.dev/your-project-id` |
| `DEPLOY_REPOSITORY` | Dockerリポジトリ名 | `your-app-fe` |
| `APP_NAME` | Cloud Runサービス名 | `your-app-fe-dev` |
| `APP_PORT` | アプリケーションポート | `8080` |
| `REGION` | デプロイ先リージョン | `asia-northeast1` |
| `NODE_ENV` | Node.js実行環境 | `production` |
| `CLOUD_RUN_SERVICE_ACCOUNT` | Cloud Runサービスアカウント | `service-account-name@your-project-id.iam.gserviceaccount.com` |

### 3.3 環境変数の例（.env.dev）

```bash
# dev環境 環境変数一覧

# Artifact Registry イメージURL
DEPLOY_IMAGE_PROJECT_URL=asia-northeast1-docker.pkg.dev/your-project-id
DEPLOY_REPOSITORY=your-app-fe
APP_NAME=your-app-fe-dev
APP_PORT=8080
REGION=asia-northeast1
NODE_ENV=production

# Cloud Run サービスアカウント
CLOUD_RUN_SERVICE_ACCOUNT=service-account-name@your-project-id.iam.gserviceaccount.com
```

> ⚠️ **セキュリティ注意**: `.env.*`ファイルは`.gitignore`に必ず追加してください。機密情報をGitリポジトリにコミットしないようにしましょう。

---

## 4. スクリプト詳細

### 4.1 docker.sh の役割

`scripts/docker.sh`は、Docker操作を統一的に管理するシェルスクリプトです。

#### 引数
```bash
./scripts/docker.sh [環境] [コマンド]
```

- **環境**: `dev` | `stg` | `prod`
- **コマンド**: `build` | `create-repo` | `push` | `deploy`

#### 機能

##### 1. build
```bash
./scripts/docker.sh dev build
```
- Dockerfileからイメージをビルド
- タグ: `{PROJECT_URL}/{REPOSITORY}/{APP_NAME}:latest`

##### 2. create-repo
```bash
./scripts/docker.sh dev create-repo
```
- Artifact Registryにリポジトリを作成
- 初回デプロイ時のみ実行

##### 3. push
```bash
./scripts/docker.sh dev push
```
- ビルド済みイメージをArtifact Registryへプッシュ
- リポジトリが存在しない場合はエラー

##### 4. deploy
```bash
./scripts/docker.sh dev deploy
```
- Cloud Runへデプロイ
- 設定:
  - メモリ: 512Mi
  - CPU: 1
  - 最大インスタンス: 10
  - Ingress: internal-and-cloud-load-balancing
  - 認証: allow-unauthenticated

---

## 5. Dockerfile構成

### 5.1 マルチステージビルド

#### Stage 1: builder
```dockerfile
FROM node:20-alpine AS builder
```
- 依存関係インストール（pnpm）
- Next.jsビルド（standaloneモード）

#### Stage 2: runner
```dockerfile
FROM node:20-alpine AS runner
```
- ビルド成果物のみコピー
- 最小イメージ構成
- 本番実行用

### 5.2 環境変数

| 変数 | 値 | 説明 |
|------|-----|------|
| `NODE_ENV` | `production` | 本番モード |
| `PORT` | `8080` | Cloud Run標準ポート |
| `HOSTNAME` | `0.0.0.0` | 全インターフェース |
| `CI` | `true` | pnpm TTYエラー回避 |

---

## 6. デプロイ手順（初回）

### 6.1 前提条件

```bash
# Google Cloud CLIインストール確認
gcloud --version

# ログイン
gcloud auth login

# プロジェクト設定
gcloud config set project your-project

# 必要なAPIを有効化
gcloud services enable \
  cloudbuild.googleapis.com \
  run.googleapis.com \
  artifactregistry.googleapis.com

# Docker認証設定
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
```

### 6.2 初回デプロイ手順

#### Dev環境の例

```bash
# 1. リポジトリ作成
pnpm docker:dev:create-repo

# 2. ビルド→プッシュ→デプロイ
pnpm docker:dev

# 3. デプロイ完了後、URLを確認
gcloud run services describe YOUR_SERVICE_NAME --region asia-northeast1 --format 'value(status.url)'
```

> ⚠️ **注意**: `YOUR_SERVICE_NAME`を`.env.dev`の`APP_NAME`に設定した値に置き換えてください。

---

## 7. 継続的デプロイ手順

### 通常のデプロイ（コード修正後）

```bash
# Dev環境へデプロイ
pnpm docker:dev

# Stg環境へデプロイ
pnpm docker:stg

# Prod環境へデプロイ
pnpm docker:prod
```

### 個別実行（トラブルシューティング用）

```bash
# ビルドのみ再実行
pnpm docker:dev:build

# プッシュのみ再実行
pnpm docker:dev:push

# デプロイのみ再実行
pnpm docker:dev:deploy
```

---

## 8. トラブルシューティング

### 8.1 リポジトリが存在しないエラー

**エラーメッセージ**:
```
❌ Dockerリポジトリ your-repository-name が存在しません。先に作成してください。
```

**解決方法**:
```bash
pnpm docker:dev:create-repo
```

### 8.2 認証エラー

**エラーメッセージ**:
```
denied: Permission "artifactregistry.repositories.downloadArtifacts" denied
```

**解決方法**:
```bash
# Docker認証を再設定
gcloud auth configure-docker asia-northeast1-docker.pkg.dev
```

### 8.3 ビルドエラー

**一般的な原因**:
- `pnpm-lock.yaml`の不整合
- `node_modules`のキャッシュ問題

**解決方法**:
```bash
# キャッシュなしでビルド
docker build --no-cache -f ./docker/dev/Dockerfile -t test .
```

---

## 9. CI/CD自動化（将来対応）

### 9.1 GitHub Actions（予定）

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main      # → prod
      - develop   # → dev

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
      - name: Deploy
        run: pnpm docker:dev  # 環境に応じて変更
```

### 9.2 Cloud Build（予定）

```yaml
# cloudbuild.yaml
steps:
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-f', 'docker/dev/Dockerfile', '-t', '${_IMAGE_URL}', '.']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', '${_IMAGE_URL}']
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args: ['run', 'deploy', '${_SERVICE_NAME}', '--image', '${_IMAGE_URL}', '--region', 'asia-northeast1']
```

---

## 10. セキュリティ・ベストプラクティス

### 10.1 環境変数管理
- ✅ `.env.*`ファイルは`.gitignore`に必ず追加
- ✅ 機密情報をGitリポジトリにコミットしない
- ✅ ドキュメントやREADMEに実際のプロジェクトID、サービスアカウントを記載しない
- ✅ Secret Managerを使用（将来対応）

### 10.2 アクセス制御
- ✅ Cloud Run Ingress: `internal-and-cloud-load-balancing`
- ✅ サービスアカウント: 最小権限の原則
- ✅ IAMロールの定期的な見直し

### 10.3 イメージ管理
- ✅ タグ: `latest`（将来的にはセマンティックバージョニング）
- ✅ 脆弱性スキャン: Artifact Registry自動スキャン有効化
- ✅ 定期的なベースイメージの更新

### 10.4 ログ・監視
- ✅ Cloud Loggingでアプリケーションログを一元管理
- ✅ 不正アクセスの監視とアラート設定
- ✅ 機密情報のログ出力を避ける

> ⚠️ **重要**: 本ドキュメントではダミー値を使用しています。実際の環境では、絶対に機密情報を公開リポジトリやドキュメントに記載しないでください。

---

## 11. 運用・監視

### 11.1 ログ確認

```bash
# Cloud Runのログを確認
gcloud run services logs read YOUR_SERVICE_NAME --region asia-northeast1 --limit 50
```

### 11.2 リソース監視

```bash
# サービスの詳細情報
gcloud run services describe YOUR_SERVICE_NAME --region asia-northeast1
```

> ⚠️ **注意**: `YOUR_SERVICE_NAME`を実際のサービス名に置き換えてください。

---

## 12. まとめ

このCI/CD仕様により、以下が実現されています：

✅ **環境分離**: dev/stg/prodの明確な分離  
✅ **簡単デプロイ**: `pnpm docker:dev`で一括実行  
✅ **再現性**: Dockerによる環境の統一  
✅ **スケーラビリティ**: Cloud Runの自動スケーリング  
✅ **運用効率**: シェルスクリプトによる自動化