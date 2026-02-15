#!/bin/bash

# ============================================================================
# PokeAPI データ取得スクリプト（一覧取得用）
# ============================================================================
# 用途: PokeAPIから一覧データを取得・整形
#       src/api/pokemon配下へJSONファイルを格納する
#
# 用法: bash scripts/fetch-pokemon-data.sh
#
# 例:
#   bash scripts/fetch-pokemon-data.sh
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
OUTPUT_DIR="src/api/pokemon"
POKEAPI_BASE="https://pokeapi.co/api/v2"

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

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

wait_for_api() {
    sleep 0.6
}

# JSON から "results" 配列を抽出（簡易版）
extract_results() {
    local json_str="$1"
    # PokeAPI のレスポンスから results 配列の内容を抽出
    echo "$json_str" | sed -n 's/.*"results":\[\(.*\)\].*/\1/p'
}

# JSON から "next" フィールドの値を抽出
extract_next() {
    local json_str="$1"
    # next フィールドの値を抽出
    echo "$json_str" | sed -n 's/.*"next":"\([^"]*\)".*/\1/p'
}

# ============================================================================
# メイン処理
# ============================================================================

log_info "PokeAPI データ取得スクリプトを開始します..."
log_info "出力ディレクトリ: $OUTPUT_DIR"

# 依存関係チェック
if ! command -v curl &> /dev/null; then
    log_error "curl がインストールされていません"
    exit 1
fi

# ディレクトリ作成
mkdir -p "$OUTPUT_DIR"

# ===========================================================
# 1. PokeAPI/pokemon を取得（ページネーション対応）
# ===========================================================

log_info "ポケモン一覧を取得中... ($POKEAPI_BASE/pokemon)"

TEMP_DIR=$(mktemp -d 2>/dev/null || echo ".temp-poke-$$")
mkdir -p "$TEMP_DIR"

trap "rm -rf $TEMP_DIR" EXIT

# ページごとのデータを取得
OFFSET=0
LIMIT=150
PAGE_COUNT=0

while true; do
    URL="$POKEAPI_BASE/pokemon?limit=$LIMIT&offset=$OFFSET"
    log_info "  → $URL"
    
    RESPONSE=$(curl -s "$URL")
    
    # レスポンスをファイルに保存
    echo "$RESPONSE" > "$TEMP_DIR/pokemon_page_$PAGE_COUNT.json"
    
    # 次のページをチェック
    NEXT=$(extract_next "$RESPONSE")
    
    if [ -z "$NEXT" ]; then
        break
    fi
    
    OFFSET=$((OFFSET + LIMIT))
    PAGE_COUNT=$((PAGE_COUNT + 1))
    wait_for_api
done

# ページからresultsを抽出して結合
COMBINED_RESULTS=""
for i in $(seq 0 $PAGE_COUNT); do
    RESULTS=$(extract_results "$(cat "$TEMP_DIR/pokemon_page_$i.json")")
    if [ -n "$COMBINED_RESULTS" ] && [ -n "$RESULTS" ]; then
        COMBINED_RESULTS="$COMBINED_RESULTS,$RESULTS"
    elif [ -n "$RESULTS" ]; then
        COMBINED_RESULTS="$RESULTS"
    fi
done

# 最終的なJSONを構築
POKEMON_COUNT=$(echo "$COMBINED_RESULTS" | tr ',' '\n' | grep -c '"name"' || echo 0)
cat > "$OUTPUT_DIR/pokemon.json" << EOF
{
  "count": $POKEMON_COUNT,
  "next": null,
  "previous": null,
  "results": [$COMBINED_RESULTS]
}
EOF

log_success "ポケモン一覧を保存しました: $OUTPUT_DIR/pokemon.json"
log_info "  件数: $POKEMON_COUNT"

wait_for_api

# ===========================================================
# 2. PokeAPI/pokemon-species を取得
# ===========================================================

log_info "ポケモン種別一覧を取得中... ($POKEAPI_BASE/pokemon-species)"

# ページごとのデータを取得
OFFSET=0
PAGE_COUNT=0

while true; do
    URL="$POKEAPI_BASE/pokemon-species?limit=$LIMIT&offset=$OFFSET"
    log_info "  → $URL"
    
    RESPONSE=$(curl -s "$URL")
    
    # レスポンスをファイルに保存
    echo "$RESPONSE" > "$TEMP_DIR/species_page_$PAGE_COUNT.json"
    
    # 次のページをチェック
    NEXT=$(extract_next "$RESPONSE")
    
    if [ -z "$NEXT" ]; then
        break
    fi
    
    OFFSET=$((OFFSET + LIMIT))
    PAGE_COUNT=$((PAGE_COUNT + 1))
    wait_for_api
done

# ページからresultsを抽出して結合
COMBINED_RESULTS=""
for i in $(seq 0 $PAGE_COUNT); do
    RESULTS=$(extract_results "$(cat "$TEMP_DIR/species_page_$i.json")")
    if [ -n "$COMBINED_RESULTS" ] && [ -n "$RESULTS" ]; then
        COMBINED_RESULTS="$COMBINED_RESULTS,$RESULTS"
    elif [ -n "$RESULTS" ]; then
        COMBINED_RESULTS="$RESULTS"
    fi
done

# 最終的なJSONを構築
SPECIES_COUNT=$(echo "$COMBINED_RESULTS" | tr ',' '\n' | grep -c '"name"' || echo 0)
cat > "$OUTPUT_DIR/pokemon-species.json" << EOF
{
  "count": $SPECIES_COUNT,
  "next": null,
  "previous": null,
  "results": [$COMBINED_RESULTS]
}
EOF

log_success "ポケモン種別一覧を保存しました: $OUTPUT_DIR/pokemon-species.json"
log_info "  件数: $SPECIES_COUNT"

# ===========================================================
# 完了
# ===========================================================

log_success "データ取得が完了しました！"
log_info "以下のファイルが生成されました:"
ls -lh "$OUTPUT_DIR"/*.json 2>/dev/null || echo "  (JSONファイルが見つかりません)"

echo ""
echo -e "${GREEN}========== 完了 ==========${NC}"
