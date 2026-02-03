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

/**
 * ポケモン一覧取得API
 * @returns
 */
export async function getPokemonList() {
	// 疑似的な遅延
	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(500);
	// 疑似的なログイン状態
	return [
		"ピカチュウ",
		"イーブイ",
		"リザードン",
		"ミュウツー",
		"ルカリオ",
		"ゲッコウガ",
		"ニンフィア",
		"ガブリアス",
		"メタグロス",
		"サーナイト",
		"バンギラス",
		"カイリュー",
		"ゲンガー",
		"フシギバナ",
		"カメックス",
		"ジュカイン",
		"バシャーモ",
		"ラグラージ",
		"エンペルト",
		"ゴウカザル",
		"ドダイトス",
		"ゾロアーク",
		"ウルガモス",
		"ギルガルド",
		"ニャオハ",
	];
}
