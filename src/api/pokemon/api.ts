import pokemonJson from "./pokemon.json";
import type {
	PokeAPIListRequest,
	PokeAPIListResponse,
	PokeAPIPokemonDetail,
	PokeAPIPokemonSpecies,
	PokemonDetail,
	PokemonList,
	PokemonListResponse,
} from "./type";

/**
 * ============================================================================
 * PokeAPI専用の関数（ファイル内部用）
 * ============================================================================
 * PokeAPIから直接データを取得するための関数。
 * これらの関数はファイル内部でのみ使用され、アプリケーションコードからは利用しない。
 */

/**
 * ポケモンのIDを取得する（名前またはIDから）
 * @param nameOrId ポケモンの名前またはID
 * @returns ポケモンのID
 */
function getPokemonIdByNameOrId(nameOrId: string | number): number {
	if (typeof nameOrId === "number") {
		return nameOrId;
	}

	// 名前から検索
	const pokemon = pokemonJson.results.find((p) => p.name === nameOrId);
	if (!pokemon) {
		throw new Error(`Pokemon not found: ${nameOrId}`);
	}

	// URLからIDを抽出
	const match = pokemon.url.match(/\/pokemon\/(\d+)\/$/);
	if (!match) {
		throw new Error(`Could not extract ID from Pokemon URL: ${pokemon.url}`);
	}

	return parseInt(match[1], 10);
}

/**
 * PokeAPI経由でポケモン一覧を取得する
 * @param limit 取得件数（デフォルト: 151）
 * @param offset オフセット（デフォルト: 0）
 * @returns ポケモンの一覧情報
 * @note PokeAPIのエンドポイント: https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}
 */
async function fetchPokeAPIPokemonList({
	/** @todo 現在対応済みは最初の9匹のみ */
	limit = 9,
	offset = 0,
}: PokeAPIListRequest = {}): Promise<PokeAPIListResponse> {
	try {
		pokemonJson;
		// limitとoffsetを適用してデータを切り取る
		const slicedResults = pokemonJson.results.slice(offset, offset + limit);
		return {
			...pokemonJson,
			results: slicedResults,
		};
	} catch (error) {
		console.error("Failed to fetch Pokemon list:", error);
		throw error;
	}
}

/**
 * ローカルファイルからポケモンの詳細情報を取得する
 * @param nameOrId ポケモンの名前またはID
 * @returns ポケモンの詳細情報
 * @note ローカルファイル: src/api/pokemon/detail/{id}.json
 */
async function fetchPokeAPIPokemon(
	nameOrId: string | number,
): Promise<PokeAPIPokemonDetail> {
	try {
		const pokemonId = getPokemonIdByNameOrId(nameOrId);
		const pokemonDetail = await import(`./detail/${pokemonId}.json`);
		return pokemonDetail.default as PokeAPIPokemonDetail;
	} catch (error) {
		console.error(`Failed to fetch Pokemon detail for ${nameOrId}:`, error);
		throw error;
	}
}

/**
 * ローカルファイルからポケモンの種別情報を取得する
 * @param idOrName ポケモンのIDまたは名前
 * @returns ポケモンの種別情報
 * @note ローカルファイル: src/api/pokemon/species/{id}.json
 */
async function fetchPokeAPIPokemonSpecies(
	idOrName: string | number,
): Promise<PokeAPIPokemonSpecies> {
	try {
		const pokemonId = getPokemonIdByNameOrId(idOrName);
		const speciesData = await import(`./species/${pokemonId}.json`);
		return speciesData.default as PokeAPIPokemonSpecies;
	} catch (error) {
		console.error(`Failed to fetch Pokemon species for ${idOrName}:`, error);
		throw error;
	}
}

/**
 * ============================================================================
 * アプリケーション内で利用する関数（export用）
 * ============================================================================
 * PokeAPI専用関数を組み合わせ、プロジェクト内で使いやすいように加工したAPI関数。
 * ui層やfeatures層などから利用される。
 */

/**
 * ポケモン一覧を取得する（日本語名対応）
 * @param limit 取得件数（デフォルト: 151）
 * @param offset オフセット（デフォルト: 0）
 * @returns 日本語名を含むポケモン一覧
 * @note 複数のポケモンの詳細情報とspecies情報を取得するため、通信負荷に注意。
 *       大量のポケモンを取得する場合はキャッシング推奨
 */
export async function fetchPokemonList({
	limit,
	offset,
}: PokeAPIListRequest = {}): Promise<PokemonListResponse> {
	try {
		// 基本的なポケモン一覧を取得
		const pokemonList = await fetchPokeAPIPokemonList({ limit, offset });

		// 各ポケモンの詳細情報と日本語名を取得（並列処理）
		const results: PokemonList = await Promise.all(
			pokemonList.results.map(async (pokemon) => {
				try {
					// 詳細情報とspecies情報を並列で取得
					const [detail, species] = await Promise.all([
						fetchPokeAPIPokemon(pokemon.name),
						fetchPokeAPIPokemonSpecies(pokemon.name),
					]);
					// 詳細情報とspecies情報を並列で取得
					// const detail = await fetchPokeAPIPokemon(pokemon.name);
					const response = {
						id: detail.id,
						name:
							species.names.find((n) => n.language.name === "ja")?.name ??
							pokemon.name, // 日本語名を優先
						enName: pokemon.name, // 英字名
						// enName: pokemon.name,
						// 公式アートワークの画像URLを取得
						// url: pokemon.url,
						imageUrl:
							detail.sprites.other?.["official-artwork"]?.front_default ?? "",
						// id: 1,
						// name: "",
						// enName: "",
						url: "",
						// imageUrl: "",
					};

					return response;
				} catch (error) {
					// ポケモン取得失敗時はデフォルト値を返す
					console.warn(
						`Failed to fetch pokemon details for ${pokemon.name}:`,
						error,
					);
					return {
						id: 0,
						name: pokemon.name,
						enName: pokemon.name,
						url: pokemon.url,
						imageUrl: "",
					};
				}
			}),
		);

		return {
			count: pokemonList.count,
			next: pokemonList.next,
			previous: pokemonList.previous,
			results,
		};
	} catch (error) {
		console.error("Failed to fetch Pokemon list with Japanese names:", error);
		throw error;
	}
}

/**
 * ポケモンの詳細情報を取得（日本語名対応）
 * @param nameOrId ポケモンの名前またはID
 * @returns ポケモンの詳細情報（日本語名を含む）
 * @note 複数のPokeAPIエンドポイントを呼び出すため、通信負荷に注意
 */
export async function fetchPokemonDetail(
	nameOrId: string | number,
): Promise<PokemonDetail> {
	try {
		const [detail, species] = await Promise.all([
			fetchPokeAPIPokemon(nameOrId),
			fetchPokeAPIPokemonSpecies(nameOrId),
		]);

		// 日本語名を取得（名前が見つからない場合は英語名をフォールバック）
		const japaneseName =
			species.names.find((n) => n.language.name === "ja")?.name || detail.name;

		return {
			...detail,
			name: japaneseName, // 日本語名を優先
			enName: detail.name, // 元の英語名をenNameに変更
			species,
		};
	} catch (error) {
		console.error(
			`Failed to fetch Pokemon detail with species for ${nameOrId}:`,
			error,
		);
		throw error;
	}
}
