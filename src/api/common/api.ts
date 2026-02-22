import type { LoginStatusResponse } from "./type";

/**
 * ログイン状態取得API
 * @returns ログイン状態オブジェクト
 */
export async function fetchLoginStatus(): Promise<LoginStatusResponse> {
	// 疑似的な遅延
	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(500);
	// 疑似的なログイン状態
	return { isLoggedIn: true };
}
