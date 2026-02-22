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

**重要**: アプリケーション層が複雑でない限り、各API実装内で以下の2つのセクションを区分けします：
1. **PokeAPI専用セクション**: PokeAPIから直接データを取得する関数（非export）
2. **アプリケーション用セクション**: アプリケーションコードから利用される関数（export）

### api.ts - API実装層
**責務**: PokeAPI等の外部APIを呼び出し、データを取得・整形する

**特徴**:
- 外部APIへのリクエスト（fetch等）を実装
- `type.ts`で定義された型をimportして使用
- 全ての関数には**JSDocコメント**を付与
- エラーハンドリングを実装
- PokeAPIのエンドポイントURLを記載
- **セクション分離**: PokeAPI専用（非export）とアプリケーション用（export）を明確に分離

**JSDocの記載項目**:
```typescript
/**
 * [関数の説明]
 * @param [パラメータ名] [説明]
 * @returns [戻り値の説明]
 * @note PokeAPIのエンドポイント: [URLを記載]
 */
```

**実装例**（pokemon APIの場合）:
```typescript
import type {
  PokeAPIListRequest,
  PokeAPIListResponse,
  PokeAPIPokemonSpecies,
  PokemonListResponse,
} from "./type";

/**
 * ============================================================================
 * PokeAPI専用の関数（ファイル内部用）
 * ============================================================================
 * PokeAPIから直接データを取得するための関数。エクスポートされず、ファイル内部のサポート関数として機能。
 */

/**
 * PokeAPI経由でポケモン一覧を取得する
 * @param limit 取得件数（デフォルト: 151）
 * @param offset オフセット（デフォルト: 0）
 * @returns ポケモンの一覧情報
 * @note PokeAPIのエンドポイント: https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}
 */
async function fetchPokeAPIPokemonList({
  limit = 151,
  offset = 0,
}: PokeAPIListRequest = {}): Promise<PokeAPIListResponse> {
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

/**
 * ============================================================================
 * アプリケーション内で利用する関数（export用）
 * ============================================================================
 * PokeAPI専用関数を組み合わせ、プロジェクト内で使いやすい形で実装された関数。
 */

/**
 * ポケモン一覧を取得する（日本語名対応）
 * @param limit 取得件数（デフォルト: 151）
 * @param offset オフセット（デフォルト: 0）
 * @returns 日本語名を含むポケモン一覧
 * @note 複数のポケモンのspecies情報を取得するため、通信負荷に注意。大量の場合はキャッシング推奨。
 */
export async function fetchPokemonList({
  limit,
  offset,
}: PokeAPIListRequest = {}): Promise<PokemonListResponse> {
  try {
    // 基本的なポケモン一覧を取得
    const pokemonList = await fetchPokeAPIPokemonList({ limit, offset });

    // 各ポケモンの日本語名を取得（並列処理）
    const results = await Promise.all(
      pokemonList.results.map(async (pokemon) => {
        try {
          const species = await fetchPokeAPIPokemonSpecies(pokemon.name);
          const name =
            species.names.find((n) => n.language.name === "ja")?.name ||
            pokemon.name;
          return {
            name,      // 日本語名を優先
            enName: pokemon.name,
            url: pokemon.url,
          };
        } catch {
          return {
            name: pokemon.name,
            enName: pokemon.name,
            url: pokemon.url,
          };
        }
      })
    );

    return {
      count: pokemonList.count,
      next: pokemonList.next,
      previous: pokemonList.previous,
      results,
    };
  } catch (error) {
    console.error("Failed to fetch Pokemon list with Japanese names:", error);
    throw error;
  }
}
```

### type.ts - 型定義層
**責務**: APIのリクエスト型・レスポンス型を集約管理

**特徴**:
- TypeScriptの`type`または`interface`で型定義
- PokeAPIからの複雑なレスポンスには**Zod**を使用してバリデーション対応
- JSDocで参考資料（PokeAPI公式ドキュメント等）を記載
- **セクション分離**: PokeAPI専用（非export）とアプリケーション用（export）を明確に分離

**セクション構成**:
- **PokeAPI専用セクション**: PokeAPIレスポンスの直接マッピング型。エクスポートの判断は個別に行う
  - `PokeAPIListRequest`、`PokeAPIListResponse`、`PokeAPIPokemonDetail` 等
- **アプリケーション用セクション**: PokeAPI専用型を組み合わせて、アプリケーション層で利用する型
  - `PokemonListResponse`、`PokemonDetail` 等（ただし`pokemon.ts`では`PokemonListResponse`内の`results`にフィールドを追加）

**型の合成パターン（Zod）**:
複雑な型はPokeAPI専用型を基に、Zod の `.omit()` や `.extend()` で合成します：
```typescript
// PokeAPI専用型から始める
const PokeAPIListResponseSchema = z.object({
  count: z.number(),
  results: z.array(PokeAPIPokemonResultSchema),
});

// アプリケーション用にフィールドを追加・変更
const PokemonListSchema = PokeAPIListResponseSchema.omit({
  results: true,
}).extend({
  results: z.array(
    PokeAPIPokemonResultSchema.omit({ name: true }).extend({
      name: z.string(),    // 日本語名
      enName: z.string(),  // 英語名
    }),
  ),
});

export type PokemonListResponse = z.infer<typeof PokemonListSchema>;
```

**型の生成ツール**:
- [transform.tools](https://transform.tools/json-to-zod): JSON → Zod Schema自動変換
- PokeAPIの実際のレスポンスをコピペして、Zod Schemaを自動生成可能

**実装例**（pokemon APIの場合）:
```typescript
import { z } from "zod";

/**
 * ============================================================================
 * PokeAPI専用の型定義（ファイル内部用）
 * ============================================================================
 * PokeAPIから直接抽出するリクエスト・レスポンスの型定義。
 */

/**
 * @description PokeAPIのポケモン一覧取得リクエスト型
 * @see https://pokeapi.co/docs/v2#pokemon
 */
export type PokeAPIListRequest = {
  limit?: number;
  offset?: number;
};

/**
 * @description PokeAPIのポケモン詳細情報の型定義
 * @see https://pokeapi.co/docs/v2#pokemon
 */
const PokeAPIPokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number().nullable(),
  height: z.number(),
  weight: z.number(),
  // ... その他のフィールド
});

export type PokeAPIPokemonDetail = z.infer<typeof PokeAPIPokemonDetailSchema>;

/**
 * ============================================================================
 * アプリケーション内で利用する型定義（export用）
 * ============================================================================
 * PokeAPI専用型を組み合わせ、プロジェクト内で使いやすいように加工した型定義。
 */

/**
 * @description ポケモン詳細情報型（日本語名対応）
 */
export type PokemonDetail = PokeAPIPokemonDetail & {
  name: string;     // 日本語名
  enName: string;   // 英語名
  species: PokeAPIPokemonSpecies;
};
```

## 新規APIエンドポイント追加の流れ

### ステップ1: ディレクトリ作成
```bash
mkdir -p src/api/[エンドポイント名]
```

### ステップ2: type.ts作成

**ファイル構成**: セクション分離を前提に実装します
- **セクション1**: PokeAPI専用の型定義（非exportが主）
- **セクション2**: アプリケーション用の型定義（export用）

**手順**:
1. PokeAPI公式ドキュメントを確認し、APIのレスポンス仕様を把握
2. **実際のレスポンスJSONから型情報を生成**
   - PokeAPIに実際にリクエストを送り、レスポンスJSONを取得
   - 取得したJSON全体を[JSON to Zod変換ツール](https://transform.tools/json-to-zod)にコピペ
   - 自動生成されたZod Schemaをコンポーネント内に貼り付け
3. PokeAPI専用セクション内で型を定義
4. 必要に応じてアプリケーション用セクションで合成型を定義（Zod の `.omit()` や `.extend()` を活用）
5. JSDocで参考資料を記載

**実装例**:
```typescript
// src/api/[エンドポイント名]/type.ts
import { z } from "zod";

/**
 * ============================================================================
 * PokeAPI専用の型定義（ファイル内部用）
 * ============================================================================
 */

/**
 * @description PokeAPI専用のレスポンス型
 * @see https://pokeapi.co/docs/v2#[セクション]
 */
const PokeAPI[TypeName]Schema = z.object({
  // フィールド定義（JSON→Zod自動変換より）
});

export type PokeAPI[TypeName] = z.infer<typeof PokeAPI[TypeName]Schema>;

/**
 * ============================================================================
 * アプリケーション内で利用する型定義（export用）
 * ============================================================================
 */

/**
 * @description アプリケーション用の複合型
 * PokeAPI専用型をベースに加工
 */
export type [TypeName] = Omit<PokeAPI[TypeName], "field_name"> & {
  // カスタムフィールド
};
```

**手順（詳細）**:
1. [PokeAPI公式](https://pokeapi.co/api/v2/pokemon/1/)等にブラウザでアクセス
2. レスポンスJSONをコピーする
3. [transform.tools](https://transform.tools/json-to-zod)を開く
4. 左側のJSONペースト欄にレスポンスを貼り付け
5. 右側に自動生成されたZod Schemaが表示される
6. スキーマをコピーして`type.ts`の**PokeAPI専用セクション**に貼り付け

### ステップ3: api.ts作成

**ファイル構成**: セクション分離を前提に実装します
- **セクション1**: PokeAPI専用の関数（非export）- PokeAPIから直接データ取得
- **セクション2**: アプリケーション用の関数（export）- PokeAPI専用関数を活用

**手順**:
1. `type.ts`から型をimport（`type`キーワード使用）
2. PokeAPI専用セクションで、外部APIへのフェッチ実装は非export
3. アプリケーション用セクションで、PokeAPI専用関数を組み合わせた実装をexport
4. 全ての関数にJSDocコメントを作成
5. エラーハンドリングを追加

**実装例**:
```typescript
// src/api/[エンドポイント名]/api.ts
import type { PokeAPI[TypeName], [TypeName] } from "./type";

/**
 * ============================================================================
 * PokeAPI専用の関数（ファイル内部用）
 * ============================================================================
 * PokeAPIから直接データを取得するための関数。エクスポートされない。
 */

/**
 * [API説明]
 * @param [パラメータ] [説明]
 * @returns [戻り値の説明]
 * @note PokeAPIのエンドポイント: https://pokeapi.co/api/v2/[パス]
 */
async function fetchPokeAPI[FunctionName](...): Promise<PokeAPI[TypeName]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch...", error);
    throw error;
  }
}

/**
 * ============================================================================
 * アプリケーション内で利用する関数（export用）
 * ============================================================================
 * PokeAPI専用関数を組み合わせ、プロジェクト内で使いやすい形で実装。
 */

/**
 * [アプリケーション用説明]
 * @param [パラメータ] [説明]
 * @returns [戻り値の説明]
 * @note 複数のPokeAPIエンドポイントを呼び出す場合、通信負荷に注意。キャッシング推奨。
 */
export async function fetch[FunctionName](...): Promise<[TypeName]> {
  try {
    // PokeAPI専用関数を活用してデータを取得・加工
    return result;
  } catch (error) {
    console.error("...", error);
    throw error;
  }
}
```

**ポイント**:
- PokeAPI専用関数は接頭辞 `fetchPokeAPI` を使用
- アプリケーション用関数は接頭辞 `fetch` を使用
- 複数エンドポイント呼び出しは `Promise.all()` で並列化
- フォールバック処理を実装（エラーハンドリング）

## ベストプラクティス

### 1. ファイル分割の原則
- `api.ts`と`type.ts`は必ず分離
- 型定義とAPI実装は別ファイルで管理
- 機能が複数の関連するエンドポイントにまたがる場合、サブディレクトリで細分化（例：`src/api/pokemon/species/`, `src/api/pokemon/evolution/`）

### 2. セクション分離の徹底
```typescript
// type.ts の例
// ============================================================================
// PokeAPI専用の型定義（ファイル内部用）
// ============================================================================
// 常にここに配置

// ============================================================================
// アプリケーション内で利用する型定義（export用）
// ============================================================================
// exportしたい型は常にここに配置
```

```typescript
// api.ts の例
// ============================================================================
// PokeAPI専用の関数（ファイル内部用）
// ============================================================================
// 非export関数を配置、接頭辞 fetchPokeAPI を使用

// ============================================================================
// アプリケーション内で利用する関数（export用）
// ============================================================================
// export関数を配置、接頭辞 fetch を使用
```

### 3. 関数命名規則
- **PokeAPI専用関数**: `fetchPokeAPI[機能名]`
  - 例：`fetchPokeAPIPokemonList()`, `fetchPokeAPIPokemon()`
- **アプリケーション用関数**: `fetch[機能名]`
  - 例：`fetchPokemonList()`, `fetchPokemonDetail()`

### 4. 型定義の命名規則
- **PokeAPI専用型**: `PokeAPI[タイプ名]`
  - 例：`PokeAPIListResponse`, `PokeAPIPokemonDetail`
- **アプリケーション用型**: `[タイプ名]`（接頭辞なし）
  - 例：`PokemonListResponse`, `PokemonDetail`
- **Zod Schema**: `[型名]Schema`
  - 例：`PokeAPIListResponseSchema`, `PokemonListSchema`

### 5. エラーハンドリング
```typescript
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return await response.json();
} catch (error) {
  console.error("Failed to fetch [data]:", error);
  throw error; // 呼び出し元で処理するため、rethrow
}
```

### 6. 型安全性
- import時は**`type`キーワード**を使用（値ではなく型のみ）
  ```typescript
  import type { PokemonDetail } from "./type";
  ```
- 複雑なスキーマは必ずZodで定義し、バリデーション機能を活用
- PokeAPIを使用する場合、transform.toolsで自動生成したスキーマを活用

### 7. パフォーマンス考慮
- 複数エンドポイント呼び出しは `Promise.all()` で並列化
  ```typescript
  const [detail, species] = await Promise.all([
    fetchPokeAPIPokemon(nameOrId),
    fetchPokeAPIPokemonSpecies(nameOrId),
  ]);
  ```
- キャッシング推奨：複数ポケモンの種別情報取得時は負荷が高い
  - JSDocに `@note` で注記を追加
  - 例：`@note 複数のPokeAPIエンドポイントを呼び出すため、通信負荷に注意。キャッシング推奨`

### 8. ドキュメント
- 全ての関数にJSDocコメントを付与（型定義でも）
- PokeAPIのエンドポイントURLを `@note` に明記
  ```typescript
  /**
   * [関数説明]
   * @param [パラメータ] [説明]
   * @returns [戻り値説明]
   * @note PokeAPIのエンドポイント: https://pokeapi.co/api/v2/[パス]
   */
  ```
- 参考資料（PokeAPI公式ドキュメント等）へのリンク(`@see`)を記載

## プロジェクト内で使用するPokeAPIエンドポイント一覧

現在、プロジェクトで実装されているPokeAPIエンドポイントは以下の通りです：

| 機能 | エンドポイント | 説明 | 実装箇所 | ステータス |
|------|---------------|------|---------|----------|
| ポケモン一覧情報取得 | `https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}` | ポケモンの基本情報一覧を取得（ページネーション対応） | `src/api/pokemon/` | ✅ 実装済 |
| ポケモン詳細情報取得 | `https://pokeapi.co/api/v2/pokemon/{name or id}` | 指定したポケモンの詳細情報を取得（能力、重さ、高さ等） | `src/api/pokemon/` | ✅ 実装済 |
| ポケモン種別情報取得 | `https://pokeapi.co/api/v2/pokemon-species/{name or id}` | ポケモンの種別情報を取得（日本語名、世代情報等） | `src/api/pokemon/` | ✅ 実装済 |

### 実装済みAPI関数と型

#### src/api/pokemon/

**関数一覧**:
- `fetchPokeAPIPokemonList()` - PokeAPI専用 - ポケモン一覧を直接取得
- `fetchPokeAPIPokemon()` - PokeAPI専用 - ポケモン詳細を直接取得
- `fetchPokeAPIPokemonSpecies()` - PokeAPI専用 - ポケモン種別を直接取得
- `fetchPokemonList()` - **export** - 日本語名対応のポケモン一覧取得（PokeAPI専用関数を活用）
- `fetchPokemonDetail()` - **export** - 日本語名対応のポケモン詳細取得（PokeAPI専用関数を活用）

**型一覧**:
- `PokeAPIListRequest` - PokeAPI専用 - ポケモン一覧リクエスト型
- `PokeAPIListResponse` - PokeAPI専用 - ポケモン一覧レスポンス型
- `PokeAPIPokemonDetail` - PokeAPI専用 - ポケモン詳細情報型
- `PokeAPIPokemonSpecies` - PokeAPI専用 - ポケモン種別情報型
- `PokemonListResponse` - **export** - 日本語名対応のポケモン一覧レスポンス型
- `PokemonList` - **export** - ポケモン一覧の結果配列型
- `PokemonDetail` - **export** - 日本語名対応のポケモン詳細型

### 実装パターン説明

**セクション分離**:
各API実装ファイルは以下の2つのセクションで構成されます：

1. **PokeAPI専用セクション** - 非export
   - PokeAPIから直接データを取得する関数
   - PokeAPIのテーブル構造に厳密に従った型定義
   - 関数名: `fetchPokeAPI[機能名]`
   - 用途: ファイル内部のサポート関数として使用

2. **アプリケーション用セクション** - export
   - PokeAPI専用関数を組み合わせたビジネスロジック
   - アプリケーション層で使いやすい型定義
   - 関数名: `fetch[機能名]`
   - 用途: UIコンポーネントやロジック層から直接呼び出し

**例**:
```typescript
// PokeAPI専用（非export）
async function fetchPokeAPIPokemonList(): Promise<PokeAPIListResponse>
async function fetchPokeAPIPokemonSpecies(): Promise<PokeAPIPokemonSpecies>

// アプリケーション用（export）
export async function fetchPokemonList(): Promise<PokemonListResponse>
  // → fetchPokeAPIPokemonList() と fetchPokeAPIPokemonSpecies() を組み合わせ
  // → 日本語名を含めたデータで返却
```

### 型の構成パターン

**Zod による型の合成**:
```typescript
// PokeAPI専用型
const PokeAPIListResponseSchema = z.object({
  count: z.number(),
  results: z.array(PokeAPIPokemonResultSchema),
});

// アプリケーション用型（フィールドカスタマイズ）
const PokemonListSchema = PokeAPIListResponseSchema
  .omit({ results: true })  // 既存フィールドを除外
  .extend({                 // 新しいフィールド定義を追加
    results: z.array(
      PokeAPIPokemonResultSchema
        .omit({ name: true })
        .extend({
          name: z.string(),      // 日本語名
          enName: z.string(),    // 英語名
        }),
    ),
  });
```

**型交差による型の合成**:
```typescript
// PokeAPI専用型を基に、新しいフィールドを追加
export type PokemonDetail = PokeAPIPokemonDetail & {
  name: string;             // 日本語名
  enName: string;           // 英語名
  species: PokeAPIPokemonSpecies;
};
```

## 参考資料
- [PokeAPI公式ドキュメント](https://pokeapi.co/docs/v2)
- [transform.tools - JSON to Zod変換](https://transform.tools/json-to-zod)
- [Zod公式ドキュメント](https://zod.dev/)
- [TypeScript - JSDoc参照](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-tags.html)
