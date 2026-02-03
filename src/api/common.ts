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

/**
 * PokeAPIからポケモン一覧を取得
 * @param limit 取得件数（デフォルト: 20）
 * @param offset オフセット（デフォルト: 0）
 * @returns ポケモンの名前のリスト
 */
export async function fetchPokemonList(
	limit: number = 20,
	offset: number = 0,
): Promise<string[]> {
	try {
		/**
		 * @todo 日本語名を取得するには詳細なAPIエンドポイントを使用する必要があります
		 * @note 詳細APIエンドポイント: https://pokeapi.co/api/v2/pokemon-species/{id or name}/
		 * @note https://pokeapi.co/docs/v2#pokemon
		 *  */

		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
		);

		if (!response.ok) {
			throw new Error(`PokeAPI Error: ${response.status}`);
		}

		const data = await response.json();
		return data.results.map(
			(pokemon: { name: string; url: string }) => pokemon.name,
		);
	} catch (error) {
		console.error("Failed to fetch Pokemon list:", error);
		throw error;
	}
}
