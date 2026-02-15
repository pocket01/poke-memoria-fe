# PokeAPI データ取得スクリプト

このドキュメントでは、PokeAPI からデータを取得するためのシェルスクリプトの使用方法を説明しています。

## スクリプト一覧

### 1. `fetch-pokemon-data.sh` - ポケモン一覧取得
**目的**: PokeAPI から全ポケモンと種別情報の一覧を取得します（一度の実行で完了）

**使用方法**:
```bash
bash scripts/fetch-pokemon-data.sh
```

**出力ファイル**:
- `src/api/pokemon/pokemon.json` - 全ポケモンのリスト（1,350件）
- `src/api/pokemon/pokemon-species.json` - 全ポケモンの種別リスト（1,025件）

**実行時間**: 約 1-2 分（PokeAPI のレート制限に対応）

### 2. `fetch-pokemon-details.sh` - ポケモン詳細取得
**目的**: 指定したポケモンの詳細情報（ステータス、技、進化など）を取得します

**使用方法**:

#### ID で指定
```bash
bash scripts/fetch-pokemon-details.sh 1 4 7 25
```

#### 名前で指定
```bash
bash scripts/fetch-pokemon-details.sh bulbasaur charmander squirtle
```

#### ID と名前を混在
```bash
bash scripts/fetch-pokemon-details.sh 1 charmander 7 pikachu
```

**出力ファイル**:
- `src/api/pokemon/pokemon-detail.json` - 指定したポケモンの詳細情報（JSON 配列）
- `src/api/pokemon/pokemon-species-detail.json` - 指定したポケモンの種別詳細情報（JSON 配列）

**実行時間**: ポケモン数に応じて（1ポケモン = 約 1-2 秒 × 2 エンドポイント）

## 技術仕様

### 実行環境要件
- Bash 4.0 以上
- curl（HTTP クライアント）
- sed, grep（テキスト処理）
- jq は **不要**（pure bash/curl による実装）

### JSON 処理
- ポケモンリスト：`"results"` フィールドのみを抽出して保存
- 詳細情報：API レスポンスをそのまま JSON 配列で保存

### API レート制限対応
- 各 API リクエスト間に 0.6 秒の待機（100 リクエスト/分制限に対応）

### データソース
- **Endpoint 1**: `https://pokeapi.co/api/v2/pokemon`（ページング対応）
- **Endpoint 2**: `https://pokeapi.co/api/v2/pokemon-species`（ページング対応）
- **Endpoint 3**: `https://pokeapi.co/api/v2/pokemon/{id}`（個別詳細）
- **Endpoint 4**: `https://pokeapi.co/api/v2/pokemon-species/{id}`（個別種別詳細）

## 使用例

### 最初の実行：全データ取得
```bash
# 1. 全ポケモンリストを取得
bash scripts/fetch-pokemon-data.sh

# 出力:
# ✓ pokemon.json (1,350件)
# ✓ pokemon-species.json (1,025件)
```

### 特定のポケモンの詳細を取得
```bash
# 2. 御三家ポケモンの詳細を取得（ID: 1, 4, 7）
bash scripts/fetch-pokemon-details.sh 1 4 7

# 出力:
# ✓ pokemon-detail.json (御三家の詳細)
# ✓ pokemon-species-detail.json (御三家の種別詳細)
```

### ユーザが入力したポケモンの詳細を取得
```bash
# 3. 名前の入力例：ユーザが "pikachu" を入力した場合
bash scripts/fetch-pokemon-details.sh pikachu

# 出力:
# ✓ pokemon-detail.json (ピカチュウの詳細)
# ✓ pokemon-species-detail.json (ピカチュウの種別詳細)
```

## ファイル形式

### pokemon.json の構造
```json
{
  "count": 1350,
  "next": null,
  "previous": null,
  "results": [
    {"name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/"},
    {"name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/"},
    ...
  ]
}
```

### pokemon-detail.json の構造
```json
[
  {
    "id": 1,
    "name": "bulbasaur",
    "height": 7,
    "weight": 69,
    "base_experience": 64,
    "abilities": [...],
    "stats": [...],
    "types": [...]
  },
  ...
]
```

## トラブルシューティング

### エラー: "ポケモンが見つかりません"
- **原因**: 指定した ID/名 が存在しない、または pokemon.json がない
- **解決**: ID/名を確認し、先に `fetch-pokemon-data.sh` を実行してください

### ネットワークエラー
- **原因**: インターネット接続不可、または PokeAPI がダウン
- **解決**: インターネット接続を確認し、[PokeAPI Status](https://pokeapi.co) を確認してください

### 実行権限エラー
```bash
chmod +x scripts/fetch-pokemon-data.sh
chmod +x scripts/fetch-pokemon-details.sh
```

## パフォーマンス最適化

### 初回実行
```bash
# リストを 1 回取得すれば、以降は詳細データの取得のみ
bash scripts/fetch-pokemon-data.sh      # 1-2分
bash scripts/fetch-pokemon-details.sh 1 # 2-3秒
```

### 大量データの取得
```bash
# 複数のポケモンを一度に取得（複数引数）
bash scripts/fetch-pokemon-details.sh 1 2 3 4 5 6 7 8 9 10
# 合計 20 リクエスト × 0.6 秒 = 約 12 秒
```

## 次のステップ

1. **TypeScript 型定義の生成**
   - 取得した JSON ファイルから Zod スキーマを生成
   - `doc/gemini/ポケメモリア PokeAPI型定義.md` を参照

2. **API レイヤーの実装**
   - `src/api/pokemon/api.ts` で fetch 関数を定義
   - 取得済みの JSON ファイルを活用

3. **コンポーネント実装**
   - ポケモンリストの表示コンポーネント
   - 詳細情報表示コンポーネント

## ライセンス
[PokeAPI](https://pokeapi.co) は CC0 1.0 Universal Public Domain Dedication のライセンスで提供されます。
