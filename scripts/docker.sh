#!/bin/bash
###############################################################
# ポケメモリア フロントエンド Docker操作スクリプト
# 使い方: ./scripts/docker.sh [引数1] [引数2]
#  引数1: 環境 (local|dev)
#  引数2: コマンド (build|push|deploy)
# Example:
#  ./scripts/docker.sh dev build: dev環境 ビルドのみ実行
#  ./scripts/docker.sh dev create-repo: dev環境 リポジトリ作成のみ実行
#  ./scripts/docker.sh dev push: dev環境 プッシュのみ実行
#  ./scripts/docker.sh dev deploy: dev環境 デプロイのみ実行
###############################################################

set -e

###############################################################
# 引数取得
###############################################################
# 環境
ENV=$1
# コマンド
COMMAND=$2
echo "ENV: $ENV"
echo "COMMAND: $COMMAND"

###############################################################
# エラーチェック
###############################################################
# プロジェクトルートに移動
cd "$(dirname "$0")/.."

# 環境変数読み込みチェック
if [ ! -f .env.$ENV ]; then
  echo "❌ .env.$ENVが見つかりません"
  exit 1
fi
# コマンド指定チェック
if [ -z "$COMMAND" ]; then
  echo "❌ コマンドが指定されていません。使い方: $COMMAND [build|create-repo|push|deploy]のいずれかを指定してください。"
  exit 1
fi
# コマンドが候補以外の場合エラー
if [[ "$COMMAND" != "build" && "$COMMAND" != "push" && "$COMMAND" != "deploy" && "$COMMAND" != "create-repo" ]]; then
  echo "❌ 無効なコマンドです。使い方: $COMMAND [build|create-repo|push|deploy]のいずれかを指定してください。"
  exit 1
fi

###############################################################
# コマンド関数定義
###############################################################
# Docker build
docker_build() {
  echo "🔨 Dockerイメージをビルド中..."
  docker build \
    -f ./docker/${ENV}/Dockerfile \
    -t ${DEPLOY_IMAGE_URL} \
    .
  echo "✅ ビルド完了: ${DEPLOY_IMAGE_URL}"
}

# Docker Repository create
docker_repository_create() {
  echo "🔨 Dockerリポジトリを作成中..."
  gcloud artifacts repositories create ${DEPLOY_REPOSITORY} \
    --repository-format=docker \
    --location=${REGION} \
    --description="ポケメモリア フロントエンド Dockerリポジトリ"

  # Dockerリポジトリの存在チェック
  if ! gcloud artifacts repositories describe ${DEPLOY_REPOSITORY} --location=${REGION} &>/dev/null; then
    echo "❌ Dockerリポジトリ ${DEPLOY_REPOSITORY} が存在しません。先に作成してください。"
    exit 1
  fi

  echo "✅ リポジトリ作成完了"
}

# Docker push
docker_push() {
  echo "📦 Artifact Registryへプッシュ中..."
  
  # Dockerリポジトリの存在チェック
  if ! gcloud artifacts repositories describe ${DEPLOY_REPOSITORY} --location=${REGION} &>/dev/null; then
    echo "❌ Dockerリポジトリ ${DEPLOY_REPOSITORY} が存在しません。先に作成してください。"
    exit 1
  fi

  docker push ${DEPLOY_IMAGE_URL}
  echo "✅ プッシュ完了"
}

# Cloud Run deploy
cloud_run_deploy() {
  echo "🚀 Cloud Runへデプロイ中..."
  gcloud run deploy ${APP_NAME} \
    --image ${DEPLOY_IMAGE_URL} \
    --service-account ${CLOUD_RUN_SERVICE_ACCOUNT} \
    --no-invoker-iam-check \
    --region ${REGION} \
    --ingress internal-and-cloud-load-balancing \
    --platform managed \
    --allow-unauthenticated \
    --port ${APP_PORT} \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --set-env-vars NODE_ENV=${NODE_ENV}
  echo "✅ デプロイ完了"
}

###############################################################
# main
###############################################################
# 環境変数を読み込み
export $(grep -v '^#' .env.$ENV | grep -v '^$' | xargs)
echo "✅ 環境変数を読み込みました"

# DockerイメージURL設定
DEPLOY_IMAGE_URL=${DEPLOY_IMAGE_PROJECT_URL}/${DEPLOY_REPOSITORY}/${APP_NAME}:latest

# コマンド実行
case "$COMMAND" in
  build)
    docker_build
    ;;
  push)
    docker_push
    ;;
  create-repo)
    docker_repository_create
    ;;
  deploy)
    cloud_run_deploy
    ;;
  *)
    echo "使い方: $0 [build|push|deploy]"
    exit 1
    ;;
esac

echo "🎉 完了しました！"