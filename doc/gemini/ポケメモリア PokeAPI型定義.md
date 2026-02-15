# PokeAPI型定義・API管理仕様書

## 概要
本プロジェクトでは、外部API（PokeAPI等）の情報を、`src/api`配下の**エンドポイント名ごとのディレクトリ**に管理しています。各APIには、リクエスト・レスポンスの型定義とAPI呼び出し実装を分離して配置します。

## ディレクトリ構造

本プロジェクトでは、以下の方針でAPI機能を管理しています：

- **親ディレクトリ**: `src/api/[エンドポイント名]/` として、機能や役割ごとにディレクトリを分割
- **ファイル分離**: 各ディレクトリ内に必ず以下の2ファイルを配置
  - `api.ts`: API呼び出しとデータ取得・整形の実装
  - `type.ts`: リクエスト型・レスポンス型の集約管理
- **サブディレクトリ**: 機能が複数の関連するエンドポイントにまたがる場合、さらに細分化可能
  - 例：`src/api/pokemon/species/`, `src/api/pokemon/evolution/` 等

## ファイル別の責務

### api.ts - API実装層
**責務**: PokeAPI等の外部APIを呼び出し、データを取得・整形する

**特徴**:
- 外部APIへのリクエスト（fetch等）を実装
- `type.ts`で定義された型をimportして使用
- 全ての関数には**JSDocコメント**を付与
- エラーハンドリングを実装
- PokeAPIのエンドポイントURLを記載

**JSDocの記載項目**:
```typescript
/**
 * [関数の説明]
 * @param [パラメータ名] [説明]
 * @returns [戻り値の説明]
 * @note PokeAPIのエンドポイント: [URLを記載]
 */
```

**実装例**:
```typescript
import type { PokemonListResponse } from "./type";

/**
 * PokeAPIでポケモン一覧を取得する
 * @param limit 取得件数（デフォルト: 151）
 * @param offset オフセット（デフォルト: 0）
 * @returns ポケモンのリスト
 * @note PokeAPIのエンドポイント: https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}
 */
async function fetchPokeApiPokemonList({
  limit = 151,
  offset = 0,
}): Promise<PokemonListResponse> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    
    if (!response.ok) {
      throw new Error(`PokeAPI Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch Pokemon list:", error);
    throw error;
  }
}

export { fetchPokeApiPokemonList };
```

### type.ts - 型定義層
**責務**: APIのリクエスト型・レスポンス型を集約管理

**特徴**:
- TypeScriptの`type`または`interface`で型定義
- PokeAPIからの複雑なレスポンスには**Zod**を使用してバリデーション対応
- JSDocで参考資料（PokeAPI公式ドキュメント等）を記載

**型生成ツール**:
- [transform.tools](https://transform.tools/json-to-zod): JSON → Zod Schema自動変換
- PokeAPIの実際のレスポンスをコピペして、Zod Schemaを自動生成可能

**実装例**:
```typescript
import { z } from "zod";

/**
 * @description PokeAPIのポケモン一覧のリクエスト型
 */
export type PokemonListRequest = {
  limit?: number;
  offset?: number;
};

/**
 * @description PokeAPIのポケモン詳細情報の型定義。
 * 実際のPokeAPIのレスポンスを元にZodスキーマで定義。
 * @see https://pokeapi.co/docs/v2#pokemon
 * @see https://transform.tools/json-to-zod (JSON→Zod変換ツール)
 */
export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  weight: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({ name: z.string(), url: z.string() }),
      is_hidden: z.boolean(),
      slot: z.number(),
    })
  ),
  // ... その他のフィールド
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;
export type PokemonListResponse = PokemonDetail[];
```

## 新規APIエンドポイント追加の流れ

### ステップ1: ディレクトリ作成
```bash
mkdir -p src/api/[エンドポイント名]
```

### ステップ2: type.ts作成
1. PokeAPI公式ドキュメントを確認し、APIのレスポンス仕様を把握
2. **実際のレスポンスJSONから型情報を生成**
   - PokeAPIに実際にリクエストを送り、レスポンスJSONを取得
   - 取得したJSON全体を[JSON to Zod変換ツール](https://transform.tools/json-to-zod)にコピペ
   - 自動生成されたZod Schemaをコンポーネント内に貼り付け
3. 必要に応じてZod Schemaを整理・最適化
4. JSDocで参考資料を記載

**実装例**:
```typescript
// src/api/[エンドポイント名]/type.ts
import { z } from "zod";

/**
 * @description [API説明]
 * 実際のPokeAPIレスポンスから自動生成されたZod Schema
 * @see https://pokeapi.co/docs/v2#[セクション]
 * @see https://transform.tools/json-to-zod (JSON→Zod自動変換ツール)
 */
export const [APIレスポンス型]Schema = z.object({
  // フィールド定義（自動生成）
});

export type [APIレスポンス型] = z.infer<typeof [APIレスポンス型]Schema>;
```

**手順（詳細）**:
1. [PokeAPI公式](https://pokeapi.co/api/v2/pokemon/1/)等にブラウザでアクセス
2. レスポンスJSONをコピーする
3. [transform.tools](https://transform.tools/json-to-zod)を開く
4. 左側のJSONペースト欄にレスポンスを貼り付け
5. 右側に自動生成されたZod Schemaが表示される
6. スキーマをコピーして`type.ts`に貼り付け

### ステップ3: api.ts作成
1. `type.ts`から型をimport
2. 外部APIへのフェッチ実装
3. エラーハンドリングを追加
4. JSDocコメントを作成（パラメータ、戻り値、エンドポイントURL）

```typescript
// src/api/[エンドポイント名]/api.ts
import type { [APIレスポンス型] } from "./type";

/**
 * [API説明]
 * @param [パラメータ] [説明]
 * @returns [戻り値の説明]
 * @note PokeAPIのエンドポイント: https://pokeapi.co/api/v2/[パス]
 */
export async function fetch[APIName](...): Promise<[戻り値型]> {
  // 実装
}
```

## ベストプラクティス

### 1. エラーハンドリング
```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  console.error("Failed to fetch data:", error);
  throw error;
}
```

### 2. 型安全性
- import時は**`type`キーワード**を使用（値ではなく型のみ）
- 複雑なスキーマは必ずZodで定義
- PokeAPIを使用する場合、transform.toolsで自動生成

### 3. ドキュメント
- 全ての関数にJSDocコメントを付与
- PokeAPIのエンドポイントURLを明記
- 参考資料（公式ドキュメント等）へのリンクを記載

### 4. ファイル分割の判断
- `api.ts`と`type.ts`は必ず分離
- 機能が複数の関連するエンドポイントにまたがる場合、サブディレクトリで細分化
- 例：`src/api/pokemon/species/`, `src/api/pokemon/evolution/` 等

## プロジェクト内で使用するPokeAPIエンドポイント一覧

現在、プロジェクトで使用予定のPokeAPIエンドポイントは以下の通りです：

| 機能 | エンドポイント | 説明 |
|------|---------------|------|
| ポケモン一覧情報取得 | `https://pokeapi.co/api/v2/pokemon` | ポケモンの基本情報一覧を取得（ページネーション対応） |
| ポケモン詳細情報取得 | `https://pokeapi.co/api/v2/pokemon/{name or id}` | 指定したポケモンの詳細情報を取得（能力、重さ、高さ等） |
| ポケモン種別情報取得 | `https://pokeapi.co/api/v2/pokemon-species/{id or name}` | ポケモンの種別情報を取得（日本語名、世代情報等） |

### エンドポイント別の利用ディレクトリ

- **ポケモン一覧情報取得**: `src/api/pokemon/`
  - `api.ts`: `fetchPokemonList()` 関数で実装
  - `type.ts`: `PokemonListResponse` 型で管理

- **ポケモン詳細情報取得**: `src/api/pokemon/`
  - `api.ts`: `fetchPokemonDetail()` 関数で実装
  - `type.ts`: `PokemonDetail` 型で管理

- **ポケモン種別情報取得（日本語名対応）**: `src/api/pokemon/`
  - `api.ts`: `fetchPokemonSpecies()` 関数で実装
  - `api.ts`: `fetchPokemonWithSpecies()` 関数でポケモン詳細と種別情報を一括取得
  - `type.ts`: `PokemonSpecies` 型で管理

### 今後の拡張予定
新規エンドポイントを追加する際は、以下のポイントを確認してください：

1. **既存エンドポイント確認**: 前述のテーブルを確認し、同じ目的のエンドポイントがないか確認
2. **ディレクトリ配置**: 関連機能ごとにグループ化（例：`src/api/pokemon/`配下に複数分類）
3. **このドキュメント更新**: エンドポイント一覧テーブルへの追記と利用ディレクトリの記載

## 参考資料
- [PokeAPI公式ドキュメント](https://pokeapi.co/docs/v2)
- [transform.tools - JSON to Zod変換](https://transform.tools/json-to-zod)
- [Zod公式ドキュメント](https://zod.dev/)
- [TypeScript - JSDoc参照](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-tags.html)
