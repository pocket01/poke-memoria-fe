# ポケメモリア

ポケモンの思い出を記録・共有するWebアプリケーション

## 🚀 技術スタック

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Design**: Neumorphism (Custom utility classes)
- **Icons**: Lucide React
- **Formatter**: Biome
- **Testing**: Vitest + Testing Library
- **Package Manager**: pnpm (Volta managed)

## 🎨 デザインコンセプト

本プロジェクトは**ニューモフィズム（Neumorphism）**を採用しています。

### カラーシステム
- **Base Color**: oklch(0.97 0.003 264) - 柔らかいニュートラル
- **Primary Color**: oklch(0.55 0.18 264) - 紫系
- **Light Source**: 左上から照射

### ユーティリティクラス

| クラス名 | 用途 |
|---------|------|
| `neu-flat` | 通常の浮き上がり効果（凸） |
| `neu-raised` | より強い浮き上がり効果 |
| `neu-pressed` | 押し込まれた効果（凹） |
| `neu-hover` | ホバー時のトランジション |
| `neu-bg` | ニューモフィズム用グラデーション背景 |

### 使用例

```tsx
<div className="neu-flat neu-hover rounded-3xl p-12">
  <h1 className="text-2xl font-bold">カードタイトル</h1>
</div>
```

## 🛠 セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 3. その他のコマンド

```bash
pnpm build      # プロダクションビルド
pnpm start      # プロダクションサーバー起動
pnpm lint       # ESLint実行
pnpm test       # テスト実行
pnpm test:ui    # テストUI起動
```

## 📁 ディレクトリ構成

本プロジェクトは、**Atomic Design**の考え方と、共通で使うものを一箇所に集約するシンプルさを取り入れた構成になっています。

```
src/
├── app/                      # エントリーポイント・ルーティング
│   ├── actions/              # サーバーアクション（将来的なデータ保存用）
│   ├── api/                  # APIルート
│   ├── (auth)/               # 認証関連（Group化して管理）
│   ├── create/               # 履歴書作成ウィザード
│   │   ├── [step]/           # 動的ルーティングでステップを管理
│   │   ├── layout.tsx        # ウィザード共通デザイン（進捗バー等）
│   │   └── page.tsx          # /create の初期画面
│   ├── layout.tsx            # 全体共通レイアウト
│   ├── page.tsx              # トップページ（LP）
├── components/               # 再利用可能な部品（Atomic Design）
│   ├── atoms/                # ボタン、入力欄、アイコン、ポケモンバッジ
│   ├── molecules/            # 入力フォームの1行、ポケモンカード（小）
│   ├── organisms/            # 作品選択グリッド、手持ち6匹リスト
│   ├── templates/            # 履歴書の各スタイル（Paper/NeoGB/RetroRG）
│   ├── pdf/                  # PDF出力用コンポーネント（Atomic Design）
│   └── ui/                   # shadcn/ui コンポーネント
├── lib/                      # ライブラリ設定（Gorm連携の定義や設定等）
├── utils/                    # ユーティリティ関数（日付整形、タグ生成 等）
├── styles/                   # テーマ設定、グローバルCSS
│   └── tailwind.css          # グローバルTailwindスタイル（ニューモフィズム含む）
├── types/                    # TypeScript型定義（Resume, Pokemon, Title 等）
├── stores/                   # グローバルステート（Zustand等での状態保持）
└── constants/                # 固定値（ポケモン作品リスト、属性データ 等）
public/                       # 静的アセット（画像、フォント、ドット絵）※Next.jsの仕様上ルート配置
```

### ディレクトリ設計のポイント

1. **Atomic Designによるコンポーネント管理**
   - `atoms/` から `templates/` までの4層でコンポーネントを整理
   - 「ボタンのデザインを直したい」→ `atoms` を見る、という直感的な作業が可能

2. **`stores/` によるステート管理**
   - ウィザード形式の「ページをまたぐデータ保持」にZustand等を使用
   - Context APIよりもシンプルな記述で開発スピードを維持

3. **動的ルーティング `app/create/[step]`**
   - 各ステップを `/create/origin`, `/create/history` と個別に作らず動的セグメントで管理
   - ステップの追加や順序入れ替えが容易

4. **`templates/` に履歴書スタイルを配置**
   - Authentic Paper、Neo GameBoy、Retro RG等のスタイルを配置
   - Atomic Designにおける「データの入れ物」として定義

## 🎨 Atomic Design - コンポーネント設計指針

本プロジェクトでは Atomic Design を採用し、以下の規則に従ってコンポーネントを配置・実装します。

### 1. 階層と責務

| 階層 | ディレクトリ | 説明 | 例 |
|:---|:---|:---|:---|
| **Atoms** | `src/components/atoms/` | 最小単位のUI要素。ドメイン知識を持たず、propsのみで動作を制御 | Button, Input, Icon, Badge |
| **Molecules** | `src/components/molecules/` | 複数のAtomsの組み合わせ。特定の機能を持つが再利用性が高い | ラベル付き入力欄、検索窓、カード |
| **Organisms** | `src/components/organisms/` | 具体的なドメイン知識を持つ複雑なUI。API通信や複雑な状態操作は行わない | ポケモン選択グリッド、手持ちリスト |
| **Templates** | `src/components/templates/` | ページ全体のレイアウト。履歴書スタイル（Paper/NeoGB）などの枠組みを定義 | 履歴書レイアウト |

### 2. 実装ルール

- **純粋性の保持:** AtomsとMoleculesは可能な限り「Presentational Component」として実装し、内部でStore（Zustand等）を参照しない
- **一貫性:** 新しいUIを作成する際はまず `atoms` に既存の部品がないか確認し、それらを組み合わせて作成
- **ファイル命名:** 原則としてコンポーネント名はディレクトリ名・ファイル名と一致させる
- **スタイリング:** Tailwind CSSを使用し、デザイン仕様書（カラー定義等）を尊重

### 3. ステート管理

- URLパラメータを「Single Source of Truth」とする
- `nuqs` を使用してクエリパラメータとUI状態を同期
- ページコンポーネント（`app/`配下）が状態管理の責務を負い、下位のコンポーネントへ関数や値を渡す

### Atomsコンポーネントの作成手順

1. **shadcn/uiからコンポーネントをダウンロード**
   ```bash
   pnpm shadcn:add [component-name]
   ```
   既存のUIライブラリを活用し、デザインシステムの一貫性を保つ

2. **Figmaデザインに基づくスタイル編集**
   - `mcp_figma-mcp_get_figma_data` ツールでデザイン仕様を確認
   - variantを追加・編集し、Figmaの dimensions、fills、strokes等を対応付け

3. **画面への適用**
   - 対象コンポーネントへのimport
   - 手動実装されたスタイルを削除し、新しいAtomコンポーネントを配置
   - 開発サーバーで動作確認

## 📄 画面以外のコンポーネント設計

ブラウザ画面以外の出力形式（PDF、メール、サーバーサイドレンダリングなど）を扱う場合、**画面用コンポーネントとディレクトリを明確に分ける**のがベストプラクティスです。

### 1. ディレクトリ分離の理由

異なる出力形式（例：PDF、Email、SSR等）は、独自のプリミティブな要素と制約を持つため、単純に画面用コンポーネントを流用するとエラーや互換性問題が発生します。

- **依存関係の分離:** 画面用のWebコンポーネント（HTML要素）が他の形式では使用不可になる可能性
- **物理制約の差:** 出力形式ごとに異なる制約（例：PDFの「A4サイズ」「ページ跨ぎ」、Emailの「インラインスタイル限定」）があり、Organismsレベルの設計思想が根本的に異なる

### 2. 推奨ディレクトリ構成

出力形式ごとに専用ディレクトリを用意し、その中でAtomic Designを適用するアプローチを推奨します。

```
src/components/
├── atoms/             # 画面用Atoms
├── molecules/         # 画面用Molecules
├── organisms/         # 画面用Organisms  
├── templates/         # 画面用Templates
├── pdf/               # PDF専用コンポーネント（react-pdfなど）
│   ├── atoms/         # テキスト、ライン、ロゴ、バッジ
│   ├── molecules/     # ラベル+値のペア、テーブルヘッダー
│   ├── organisms/     # ユーザー情報ブロック、テーブル
│   └── templates/     # A4レイアウト、ページ余白、ヘッダー・フッター配置
├── email/             # Email専用コンポーネント（例）
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
└── pdf/               # その他の出力形式
    ├── atoms/
    ├── molecules/
    ├── organisms/
    └── templates/
```

### 3. 各出力形式の階層定義

| 階層 | 役割 | 例（PDF） | 例（Email） |
|:---|:---|:---|:---|
| **Atoms** | 最小単位の装飾・要素 | テキスト（フォントサイズ別）、線、ロゴ | インラインテキスト、リンク、画像 |
| **Molecules** | 2つ以上のAtomの組み合わせ | ラベル+値のペア、テーブルセル | ボタン、リンクリスト |
| **Organisms** | 文脈を持つ独立したセクション | 情報ブロック、テーブル、セクション | メールセクション（ヘッダー、本文、フッター） |
| **Templates** | 全体構造定義 | ページ余白、ヘッダー・フッター配置 | Email全体レイアウト |

### 4. Pages層の扱い（エントリーポイント）

各出力形式のPages層は、**実際のデータを流し込んで、その形式のストリーム（PDF、HTML、etc）を生成するコンポーネント**になります。

例えば `ResumePDF.tsx` や `ResumeEmail.tsx` のようなファイルがPages層または `features/[format]` などに位置し、ここがエントリーポイントとなって対応する `Template` や `Organism` を呼び出します。

### 5. スタイル共通化のベストプラクティス

複数の出力形式で「同じブランドカラー」や「同じフォントルール」を使う場合、atoms のさらに下層にある **Theme（デザイントークン）** だけを全形式で共有するように設計すると、保守性が飛躍的に高まります。

```
src/
├── styles/
│   ├── themes/        # 全形式で共有するデザイントークン
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   └── tailwind.css   # 画面用スタイル
```

## 📝 環境要件

- Node.js: 22.12.0
- pnpm: 10.26.2

※ Voltaによる自動バージョン管理に対応しています。

http://localhost:3000 でアプリケーションが起動します。

### テストの実行

```bash
# テストを実行
pnpm test

# テストUIを起動
pnpm test:ui
```

### ビルド

```bash
pnpm build
```

### プロダクションサーバーの起動

```bash
pnpm start
```

## shadcn/ui コンポーネントの追加

新しいコンポーネントを追加する場合：

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
```

## カラーパレット

プロジェクトはニューモフィズムに適した柔らかいブルー系のカラーパレットを使用しています。
ライトモードとダークモードの両方に対応しています。

詳細は [src/styles/tailwind.css](src/styles/tailwind.css) を参照してください。

