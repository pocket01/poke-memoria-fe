#!/bin/bash

# ============================================================================
# PokeAPI ポケモン画像取得スクリプト
# ============================================================================
# 用途: PokeAPIからポケモンの画像を取得してローカルに保存
#       public/pokemons配下へ画像ファイルを格納する
#
# 用法: bash scripts/fetch-pokemon-images.sh [START_ID] [END_ID]
#
# 例:
#   bash scripts/fetch-pokemon-images.sh 1 151    # 最初の151匹
#   bash scripts/fetch-pokemon-images.sh 1 1050   # 全ポケモン
#
# デフォルト: 1～151（初代ポケモン）
#
# 依存関係：
#   - curl: HTTPクライアント
# ============================================================================

set -e

# 色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 設定
OUTPUT_DIR="public/pokemons"
IMAGES_BASE_URL="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork"

# デフォルト値
START_ID="${1:-1}"
END_ID="${2:-151}"

# ============================================================================
# ユーティリティ関数
# ============================================================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# ============================================================================
# メイン処理
# ============================================================================

# ディレクトリ作成
if [ ! -d "$OUTPUT_DIR" ]; then
    log_info "ディレクトリを作成中: $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
fi

log_info "ポケモン画像の取得を開始します"
log_info "範囲: ID $START_ID ～ $END_ID"
log_info "保存先: $OUTPUT_DIR"
echo ""

TOTAL=$((END_ID - START_ID + 1))
COUNT=0
SUCCESS_COUNT=0
FAILED_COUNT=0
SKIP_COUNT=0

START_TIME=$(date +%s)

# IDの範囲でループ
for ((ID = START_ID; ID <= END_ID; ID++)); do
    COUNT=$((COUNT + 1))
    
    # 3桁のIDにパディング
    PADDED_ID=$(printf "%03d" $ID)
    IMAGE_FILE="$OUTPUT_DIR/${PADDED_ID}.png"
    IMAGE_URL="$IMAGES_BASE_URL/$ID.png"
    
    # ファイルが既に存在する場合はスキップ
    if [ -f "$IMAGE_FILE" ]; then
        SKIP_COUNT=$((SKIP_COUNT + 1))
        if [ $((COUNT % 10)) -eq 0 ]; then
            echo -ne "進捗: $COUNT/$TOTAL\r"
        fi
        continue
    fi
    
    # 画像をダウンロード
    if curl -s -f -o "$IMAGE_FILE" "$IMAGE_URL"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
        if [ $((COUNT % 10)) -eq 0 ]; then
            echo -ne "進捗: $COUNT/$TOTAL (成功: $SUCCESS_COUNT, スキップ: $SKIP_COUNT)\r"
        fi
    else
        FAILED_COUNT=$((FAILED_COUNT + 1))
        log_warning "ID $ID ($IMAGE_URL) のダウンロードに失敗しました"
        # ファイルが部分的に作成された場合は削除
        rm -f "$IMAGE_FILE"
    fi
    
    # 100件ごとに完了報告
    if [ $((COUNT % 100)) -eq 0 ]; then
        echo ""
        log_success "進捗報告: $COUNT/$TOTAL件完了 (成功: $SUCCESS_COUNT, スキップ: $SKIP_COUNT, 失敗: $FAILED_COUNT)"
    fi
    
    # APIレート制限対策（リクエスト間隔）
    sleep 0.1
done

END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))

echo ""
echo ""
log_success "ダウンロード完了！"
echo ""
echo "=== 結果サマリー ==="
echo "対象件数:    $TOTAL"
echo "成功:        $SUCCESS_COUNT"
echo "スキップ:    $SKIP_COUNT"
echo "失敗:        $FAILED_COUNT"
echo "所要時間:    ${ELAPSED}秒"
echo ""
