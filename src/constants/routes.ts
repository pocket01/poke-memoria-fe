import type { Route } from "next";

/**
 * 履歴書作成ルート一覧
 */
const CreateRoutes = [
	"/create/origin",
	"/create/history",
	"/create/partners",
	"/create/profile",
	"/create/preview",
	"/create/complete",
] as const satisfies Route[];

/**
 * 履歴書作成ステップ定義。
 * 配列順にステップが進行することを想定。
 */
export const CreateSteps = [
	// ステップ１．原点
	{ page: "/create/origin", label: "原点" },
	// ステップ２．軌跡
	{
		page: "/create/history",
		label: "軌跡",
	},
	// ステップ３．相棒
	{
		page: "/create/partners",
		label: "相棒",
	},
	// ステップ４．プロフィール
	{
		page: "/create/profile",
		label: "プロフィール",
	},
	// // ステップ５．確認
	{ page: "/create/preview", label: "確認" },
	// ステップ６．完成
	{ page: "/create/complete", label: "完成" },
] as const satisfies Array<{
	page: (typeof CreateRoutes)[number];
	label: string;
}>;
