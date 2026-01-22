# 質問
ありがとう。
ここまでの内容を一度整理し、`作業指示書.md`を仮作成してください。
作成した指示書を、claudeへ渡し、ソースコードのテンプレートを作成してもらいます。

# 回答

承知いたしました。これまでの設計の集大成ですね。
ClaudeなどのAIに渡した際に、迷いなく正確なコードを生成してもらえるよう、要件を構造化した「作業指示書（プロンプト用）」を作成しました。

この内容をそのままコピー＆ペーストして活用してください。

---

# 作業指示書.md

## 1. プロジェクト概要

Next.js (App Router) を使用した多ステップフォームの実装。
「各ステップの入力データ」と「保存・遷移ロジック」を分離し、ユーザーがページを遷移しても入力内容が保持され、共通レイアウト上のボタンから一括保存できるアーキテクチャを構築する。

## 2. 技術スタック

* **Framework**: Next.js (App Router)
* **Form Library**: React Hook Form (公式の `FormProvider` を使用)
* **Validation**: Zod
* **State Management**: Context API (FormProvider 内包)
* **Communication**: Server Actions

## 3. アーキテクチャ詳細

### A. Layout 層 (app/layout.tsx)

* `GlobalFormProvider` で `children` をラップする。
* 共通のナビゲーションボタン（NavigationButtons.tsx）を配置する。

### B. Context 層 (context/GlobalFormProvider.tsx)

* `useForm` を呼び出し、`FormProvider` を提供する。
* **Zod Schema**: `preprocess` を使い、空文字 (`""`) を `null` に変換する処理を含めること。
* **型定義**: フォーム全体の TypeScript 型定義（全ステップ分）を定義し、`useFormContext` に継承させる。

### C. Page 層 (app/step-1/page.tsx, step-2/page.tsx, etc.)

* `useFormContext` を使用して、親 Provider の状態を参照・更新する。
* 各入力項目は `register` で紐付ける。

### D. Navigation 層 (components/NavigationButtons.tsx)

* `useFormContext` の `trigger` メソッドで現ページのバリデーションを実行。
* `getValues` でデータを取得し、最終ステップでは Server Actions を実行する。
* 送信状態は `useActionState` (または `formState.isSubmitting`) で制御する。

## 4. 実装の重点ポイント

1. **データの永続化**: ページ遷移（URL変更）で状態がリセットされないよう、`layout.tsx` の構造を正しく保つこと。
2. **空文字問題の解決**: Zod の `transform` または `preprocess` を用いて、DB保存時に不都合な空文字を `null` に変換するロジックを組み込むこと。
3. **型安全**: `useFormContext<MyFormData>()` をラップした独自フック `useMyGlobalForm` を作成し、各ページで型補完が効くようにすること。

## 5. 出力依頼

以下のファイルを、疎結合を保った状態で作成してください。

1. `types/form.ts` (全体の型定義)
2. `lib/schema.ts` (Zod スキーマ)
3. `context/GlobalFormProvider.tsx`
4. `app/layout.tsx` (Provider の配置例)
5. `components/NavigationButtons.tsx` (制御ロジック)
6. `app/step-1/page.tsx` (入力ページの実装例)

---

### 次のステップへのアドバイス

Claudeに渡す際、もし特定のUIライブラリ（shadcn/ui, MUI, Tailwind CSSなど）を使いたい場合は、末尾に**「UIは〇〇を使用してスタイリングしてください」**と一言添えると、より完成度の高いコードが出てきます。

これで、理想的な多ステップフォームの土台が出来上がるはずです。実装がうまくいくことを願っています！