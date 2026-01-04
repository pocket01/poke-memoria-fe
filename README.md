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
│   └── globals.css           # グローバルスタイル（ニューモフィズム含む）
├── components/               # 再利用可能な部品（Atomic Design）
│   ├── atoms/                # ボタン、入力欄、アイコン、ポケモンバッジ
│   ├── molecules/            # 入力フォームの1行、ポケモンカード（小）
│   ├── organisms/            # 作品選択グリッド、手持ち6匹リスト
│   ├── templates/            # 履歴書の各スタイル（Paper/NeoGB/RetroRG）
│   └── ui/                   # shadcn/ui コンポーネント
├── hooks/                    # カスタムフック（useResume, useMobile 等）
├── lib/                      # ライブラリ設定（Gorm連携の定義や設定等）
├── utils/                    # ユーティリティ関数（日付整形、タグ生成 等）
├── styles/                   # テーマ設定、グローバルCSS
├── types/                    # TypeScript型定義（Resume, Pokemon, Title 等）
├── stores/                   # グローバルステート（Zustand等での状態保持）
├── constants/                # 固定値（ポケモン作品リスト、属性データ 等）
└── public/                   # 静的アセット（画像、フォント、ドット絵）
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

詳細は [app/globals.css](app/globals.css) を参照してください。

