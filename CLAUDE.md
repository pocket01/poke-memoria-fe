# 概要
- `作業前に確認`を確認し、全てOKの場合に作業を開始してください。
  - いずれかがNGの場合、作業を停止してユーザに報告してください。
  - 全てOKの場合、`作業内容`を確認し、作業を実施してください。

# 作業前に確認
- mcpサーバ`figma-mcp`を起動していること。
- FigmaのURLが参照できること。

# 作業内容
- プロンプトの指示に従ってください
- 参照ドキュメント
  - `doc`配下のドキュメントすべて（サブディレクトリは除く）
  - `README.md`
- 参照Figma
  - `プロンプトの指示にしたがってください`
  - 一度参照したFigmaデザインは、次の指示があるまで参照し続けてください
- 備考
  - Figmaのキー情報など、機密情報を回答内に表示しないこと。

# コンポーネント設計指針 (Atomic Design)
本プロジェクトでは Atomic Design を採用し、以下の規則に従ってコンポーネントを配置・実装すること。

## 1. ディレクトリ構造と責務
- `src/components/atoms/`: 最小単位のUI要素（Button, Input, Icon等）。ドメイン知識を持たず、propsのみで動作を制御する。
- `src/components/molecules/`: 複数のAtomsの組み合わせ。特定の機能（検索窓、ラベル付き入力欄等）を持つが、まだ再利用性が高い状態。
- `src/components/organisms/`: 具体的ドメイン知識を持つ複雑なUI（タイトル選択グリッド、手持ちポケモンリスト等）。API通信や複雑な状態操作は行わず、propsやStore経由でデータを受け取る。
- `src/components/templates/`: ページ全体のレイアウト。具体的なスタイル（Paper, NeoGB等）の枠組みを定義する。

## 2. 実装ルール
- **純粋性の保持**: AtomsとMoleculesは可能な限り「Presentational Component」として実装し、内部でStore（Zustand等）を参照しない。
- **一貫性**: 新しいUIを作成する際は、まず `atoms` に既存の部品がないか確認し、それらを組み合わせて作成すること。
- **ファイル命名**: 原則としてディレクトリ名に関わらずコンポーネント名はパスと一致させる（例: `src/components/atoms/button/page.tsx` ではなく、1ファイル1コンポーネントの原則を推奨する場合は適宜変更）。
- **スタイリング**: Tailwind CSSを使用し、デザイン仕様書（`master.ts` のカラー定義等）を尊重すること。

## 3. ステート管理
- URLパラメータを「Single Source of Truth」とする。
- `nuqs` を使用してクエリパラメータとUI状態を同期させる。
- ページコンポーネント (`app/` 配下) または `features/` 層が状態管理の責務を負い、下位のコンポーネントへ関数や値を渡すこと。

## 開発フローの指示
1. 実装前に必ず既存の `components` 配下を確認し、再利用可能なパーツを特定すること。
2. 新規コンポーネント作成時は、どの階層（Atom/Molecule/Organism）に属すべきか検討し、その理由を簡潔に述べてから実装に移れ。

---

# Atomicコンポーネント作成の標準手順

## Atoms作成の3ステップ

### ステップ1: shadcn/uiからコンポーネントをダウンロード
```bash
# 例: badgeコンポーネントの場合
pnpm shadcn:add badge
```
- 既存のUIライブラリを活用し、デザインシステムの一貫性を保つ
- `src/components/atoms/` 配下に自動配置される

### ステップ2: Figmaデザインに基づくスタイル編集
1. **Figmaデータの取得と確認**
   - `mcp_figma-mcp_get_figma_data` ツールでデザイン仕様を確認
   - レイアウト、色、サイズ、フォントスタイルなどを把握

2. **variantの追加・編集**
   ```tsx
   // 例: badge.tsx に year variant を追加
   const badgeVariants = cva(
     "...", // 基本スタイル
     {
       variants: {
         variant: {
           default: "...",
           year: "w-12 h-12 bg-white border-2 border-gray-300 text-gray-600 text-xs font-normal px-0 py-0",
         },
       },
     },
   );
   ```

3. **Figmaデザインとの対応付け**
   - `width`, `height`: Figmaの dimensions
   - `backgroundColor`: Figmaの fills
   - `borderColor`, `borderWidth`: Figmaの strokes
   - `fontSize`, `fontWeight`: Figmaの textStyle
   - `borderRadius`: Figmaの borderRadius

### ステップ3: 画面への適用
1. **対象コンポーネントへのimport**
   ```tsx
   import { Badge } from "@/components/atoms/badge";
   ```

2. **既存コードの置き換え**
   - 手動で実装されたスタイルを削除
   - 新しいAtomコンポーネントを配置
   ```tsx
   // Before
   <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 text-gray-600">
     {year}
   </div>
   
   // After
   <Badge variant="year">{year}</Badge>
   ```

3. **動作確認**
   - 開発サーバーで表示を確認
   - Figmaデザインとの整合性をチェック

## 実装時の注意点
- **段階的な実装**: 1つのAtomを完成させてから次へ進む
- **再利用性の考慮**: 特定の画面に依存しない汎用的なpropsインターフェースを設計
- **型安全性**: TypeScriptの型定義を活用し、propsの型を明確にする
- **命名規則**: コンポーネント名とファイル名を一致させる
- **コメント**: 複雑なvariantや特殊な用途には説明コメントを追加

## 作成順序の推奨
1. **Atoms**: Badge → Icon → Button → Input → その他
2. **Molecules**: 複数のAtomsを組み合わせた機能単位
3. **Organisms**: ドメイン知識を持つ複雑なUI
4. **全体のリファクタリング**: 既存コードを新しいAtomic構造に移行
