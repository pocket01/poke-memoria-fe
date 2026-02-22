#!/bin/bash

# ============================================================================
# PokeAPI ポケモン詳細取得スクリプト
# ============================================================================
# 用途: PokeAPIから指定したポケモンの詳細情報を取得
#       src/api/pokemon配下へJSONファイルを格納する
#
# 用法: bash scripts/fetch-pokemon-details.sh <id or name>
#
# 例:
#   bash scripts/fetch-pokemon-details.sh 1           # IDで検索
#   bash scripts/fetch-pokemon-details.sh bulbasaur   # 名前で検索
#   bash scripts/fetch-pokemon-details.sh 1 2 3       # 複数指定可能
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
DETAIL_DIR="$OUTPUT_DIR/detail"
SPECIES_DIR="$OUTPUT_DIR/species"
POKEAPI_BASE="https://pokeapi.co/api/v2"
POKEMON_LIST_FILE="$OUTPUT_DIR/pokemon.json"

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

show_help() {
    head -n 24 "$0" | tail -n 20
}

# JSONファイルから元のID（URL内のID）を抽出
extract_pokemon_id_from_url() {
    local json_str="$1"
    # "url": "https://pokeapi.co/api/v2/pokemon/{ID}/" から ID を抽出
    echo "$json_str" | grep -o '"url":"[^"]*"' | sed 's/"url":"//' | sed 's/"$//' | grep -o '[0-9]*/$' | sed 's/\/$//'
}

# pokemon.json からポケモン情報を検索
find_pokemon_by_id_or_name() {
    local search_term="$1"
    
    # 数字の場合はIDで検索、文字列の場合は名前で検索
    if [[ "$search_term" =~ ^[0-9]+$ ]]; then
        # ID検索: url フィールドから探す
        # URLは https://pokeapi.co/api/v2/pokemon/{ID}/ という形式
        grep -o '"url":"[^"]*pokemon/'$search_term'/[^"]*"' "$POKEMON_LIST_FILE" | head -1 | sed 's/"url":"//' | sed 's/"$//'
    else
        # 名前検索: {"name":"pokemonname","url":"..."} の形式で取得
        grep -o '{"name":"'$search_term'","url":"[^"]*"}' "$POKEMON_LIST_FILE" | sed 's/.*"url":"//' | sed 's/".*//'
    fi
}

# ============================================================================
# メイン処理
# ============================================================================

log_info "PokeAPI ポケモン詳細取得スクリプトを開始します..."
log_info "出力ディレクトリ: $OUTPUT_DIR"

# 依存関係チェック
if ! command -v curl &> /dev/null; then
    log_error "curl がインストールされていません"
    exit 1
fi

# pokemon.json が存在するか確認
if [ ! -f "$POKEMON_LIST_FILE" ]; then
    log_error "pokemon.json が見つかりません: $POKEMON_LIST_FILE"
    log_error "先に fetch-pokemon-data.sh を実行してください"
    exit 1
fi

# 引数チェック
if [ $# -eq 0 ]; then
    log_error "引数が指定されていません"
    show_help
    exit 1
fi

# オプション確認
case "$1" in
    --help|-h)
        show_help
        exit 0
        ;;
esac

# ディレクトリ作成
mkdir -p "$OUTPUT_DIR" "$DETAIL_DIR" "$SPECIES_DIR"

# 一時ディレクトリ作成
TEMP_DIR=$(mktemp -d 2>/dev/null || echo ".temp-poke-details-$$")
mkdir -p "$TEMP_DIR"
trap "rm -rf $TEMP_DIR" EXIT

# ===========================================================
# 各引数のポケモン詳細情報を取得
# ===========================================================

POKEMON_COUNT=0
VALID_COUNT=0

for SEARCH_TERM in "$@"; do
    POKEMON_COUNT=$((POKEMON_COUNT + 1))
    echo -ne "\r[$POKEMON_COUNT/$#] ポケモン: $SEARCH_TERM を検索中..."
    
    # pokemon.json からURLを取得
    POKEMON_URL=$(find_pokemon_by_id_or_name "$SEARCH_TERM")
    
    if [ -z "$POKEMON_URL" ]; then
        log_warn "ポケモンが見つかりません: $SEARCH_TERM"
        continue
    fi
    
    # URLからIDを抽出
    POKEMON_ID=$(echo "$POKEMON_URL" | grep -o '[0-9]*/$' | sed 's/\/$//')
    
    if [ -z "$POKEMON_ID" ]; then
        log_warn "IDを抽出できません: $SEARCH_TERM"
        continue
    fi
    
    VALID_COUNT=$((VALID_COUNT + 1))
    
    # ポケモン詳細情報を取得
    POKEMON_RESPONSE=$(curl -s "$POKEAPI_BASE/pokemon/$POKEMON_ID")
    echo "$POKEMON_RESPONSE" > "$TEMP_DIR/pokemon_$POKEMON_ID.json"
    
    # ポケモン種別詳細情報を取得
    SPECIES_RESPONSE=$(curl -s "$POKEAPI_BASE/pokemon-species/$POKEMON_ID")
    echo "$SPECIES_RESPONSE" > "$TEMP_DIR/species_$POKEMON_ID.json"
    
    wait_for_api
done

echo ""

# ===========================================================
# ファイルの保存
# ===========================================================

if [ $VALID_COUNT -gt 0 ]; then
    # pokemon-details を個別ファイルで保存
    for FILE in "$TEMP_DIR"/pokemon_*.json; do
        if [ -f "$FILE" ]; then
            # ファイル名から ID を抽出
            POKEMON_ID=$(basename "$FILE" .json | sed 's/pokemon_//')
            cp "$FILE" "$DETAIL_DIR/$POKEMON_ID.json"
            log_success "ポケモン詳細情報を保存しました: $DETAIL_DIR/$POKEMON_ID.json"
        fi
    done
    
    # pokemon-species-details を個別ファイルで保存
    for FILE in "$TEMP_DIR"/species_*.json; do
        if [ -f "$FILE" ]; then
            # ファイル名から ID を抽出
            POKEMON_ID=$(basename "$FILE" .json | sed 's/species_//')
            cp "$FILE" "$SPECIES_DIR/$POKEMON_ID.json"
            log_success "ポケモン種別詳細情報を保存しました: $SPECIES_DIR/$POKEMON_ID.json"
        fi
    done
fi

# ===========================================================
# 完了
# ===========================================================

log_success "データ取得が完了しました！（取得件数: $VALID_COUNT/$POKEMON_COUNT）"
log_info "以下のディレクトリにファイルが生成されました:"
log_info "  detail ディレクトリ:"
ls -lh "$DETAIL_DIR"/*.json 2>/dev/null | awk '{print "    " $9, "(" $5 ")"}' || echo "    (ファイルが見つかりません)"
log_info "  species ディレクトリ:"
ls -lh "$SPECIES_DIR"/*.json 2>/dev/null | awk '{print "    " $9, "(" $5 ")"}' || echo "    (ファイルが見つかりません)"

echo ""
echo -e "${GREEN}========== 完了 ==========${NC}"
