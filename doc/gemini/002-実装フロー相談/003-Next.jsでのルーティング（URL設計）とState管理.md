# 質問
ありがとう。無事に仮デザインが作成されました。
> デザインのラフがFigmaで生成できたら、次はそれを実装に落とし込むための 「STEP 2：Next.jsでのルーティング（URL設計）とState管理」 の設計図を作成しましょうか？
上記をお願いします。

---

デザインの作成お疲れ様です！形が見えてくるとモチベーションも上がりますね。

1日1時間の限られた時間で、迷いなくコーディングを進めるための**「ルーティング」と「State（状態）管理」の設計図**を作成しました。Next.js (App Router) の特性を活かし、拡張性と保守性を両立させた構成です。

---

## 1. ルーティング設計（URL構成）

ウィザード形式ですが、各ステップに固有のURLを持たせることを推奨します。
**理由:** ブラウザの「戻る」ボタンが直感的に動くこと、および特定のステップをリロードしても最初からやり直しにならないようにするためです。

| パス | 役割 | 対応するStep |
| --- | --- | --- |
| `/create` | イントロダクション（開始画面） | 導入 |
| `/create/origin` | 初めての冒険を選択 | Step 1 |
| `/create/history` | プレイ作品・スタンプ選択 | Step 2 |
| `/create/partners` | 相棒の選択とコメント | Step 3 |
| `/create/identity` | 属性・スタイル・自由記述 | Step 4 |
| `/create/preview` | 最終確認と保存 | 生成・プレビュー |

---

## 2. State（状態）管理の設計

各ページ（URL）をまたいでデータを保持する必要があります。1日1時間の作業で複雑なライブラリ（Reduxなど）を導入すると学習に時間を取られるため、**React Context API** または **URLクエリパラメータ** の併用が最適です。

### 構成案：`ResumeContext` の作成

アプリ全体を `ResumeProvider` で包み、どのページからでも履歴書データにアクセス・更新できるようにします。

**保持するデータ構造（再掲・精査）:**

```typescript
type ResumeData = {
  theme: 'paper' | 'neo_gb' | 'retro_rg';
  originTitleId: string;
  history: Array<{ titleId: string; status: 'release' | 'later' | 'remake' }>;
  partners: Array<{ pokemonId: number; name: string; comment: string }>;
  trainerInfo: {
    name: string;
    startYear: string;
    playCount: number;
    tags: string[];
    message: string;
  };
};

```

---

## 3. 実装のディレクトリ構造案

> **Note**: 最新のディレクトリ構成については [README.md](../../README.md#-ディレクトリ構成) を参照してください。
> 以下は初期検討時の構成案です。実際のプロジェクトではAtomic Designに基づいた構成を採用しています。

Next.jsの App Router に基づいた構成です。

```text
src/
 ├── app/
 │    └── create/
 │         ├── layout.tsx      # ここで ResumeProvider を配置（共通レイアウト）
 │         ├── page.tsx        # 導入画面
 │         ├── origin/         # Step 1
 │         ├── history/        # Step 2
 │         ├── partners/       # Step 3
 │         ├── identity/       # Step 4
 │         └── preview/        # 最終確認
 ├── components/
 │    ├── wizard/              # 各ステップのフォーム部品
 │    └── ui/                  # ボタンや入力欄などの共通部品
 └── context/
      └── ResumeContext.tsx    # 状態管理ロジック

```

---

## 4. 1日1時間で進めるための「実装のヒント」

1. **Contextの雛形を先に作る:** データの器（Context）さえあれば、各ページのUI作成中に「データの保存」を意識せずに進められます。
2. **`localStorage` との同期:** ブラウザを閉じてもデータが消えないよう、Context内で `localStorage` に保存する処理を入れておくと、中断・再開が容易になり、開発体験が向上します。
3. **「次へ」ボタンの共通化:** `useRouter` を使って次のURLへ遷移する共通のナビゲーションコンポーネントを作っておくと、各ページの作成が楽になります。

---

### 次のステップへのご提案

設計図が固まりました。実際のコーディングに入る準備は万端です！

次は、**「[FE] 履歴書データ型定義（TS）」と「ResumeContextの作成」** の具体的なコードを書いていきましょうか？

あるいは、**「Step 1（原点選択画面）の具体的なReactコンポーネントの構造」** から詳細化しますか？