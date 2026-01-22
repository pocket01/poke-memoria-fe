/**
 * ログイン状態取得API
 * @returns ログイン状態オブジェクト
 */
export async function getLoginStatus() {
	// 疑似的な遅延
	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(500);
	// 疑似的なログイン状態
	return { isLoggedIn: true };
}
