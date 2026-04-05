import type { Route } from "next";

/**
 * 履歴書作成ルート一覧
 */
type CreateRoute = Route<
	| "/create/origin"
	| "/create/history"
	| "/create/partners"
	| "/create/profile"
	| "/create/preview"
	| "/create/complete"
>;

/**
 * 履歴書作成ステップの型定義
 */
export type CreateStep = {
	page: CreateRoute;
	label: string;
	title: string;
	description: string;
};

/**
 * 履歴書作成ステップ定義。
 * 配列順にステップが進行することを想定。
 */
export const CreateSteps = [
	// ステップ１．原点
	{
		page: "/create/origin",
		label: "原点",
		title: "あなたの冒険はどこから始まりましたか？",
		description: "最初に出会ったポケモンの世界を選択してください",
	},
	// ステップ２．軌跡
	{
		page: "/create/history",
		label: "軌跡",
		title: "あなたが旅した地方",
		description: "プレイした作品にスタンプを押してください",
	},
	// ステップ３．相棒
	{
		page: "/create/partners",
		label: "相棒",
		title: "あなたの相棒ポケモンを教えてください",
		description: "一緒に冒険したポケモンを選んでください",
	},
	// ステップ４．プロフィール
	{
		page: "/create/profile",
		label: "プロフィール",
		title: "プロフィール",
		description: "あなた自身について教えてください",
	},
	// // ステップ５．確認
	{
		page: "/create/preview",
		label: "確認",
		title: "履歴書の確認",
		description: "内容を確認して履歴書を完成させましょう",
	},
	// ステップ６．完成
	{
		page: "/create/complete",
		label: "完成",
		title: "履歴書が完成しました！",
		description: "",
	},
] as const satisfies Array<CreateStep>;
