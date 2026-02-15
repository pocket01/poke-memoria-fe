import { z } from "zod";

/**
 * ============================================================================
 * PokeAPI専用の型定義（ファイル内部用）
 * ============================================================================
 * PokeAPIから直接抽出するリクエスト・レスポンスの型定義。
 * これらの型はapi.ts内部で使用され、アプリケーションコードからは利用しない。
 */

/**
 * @description PokeAPIのポケモン一覧取得リクエスト型
 * @see https://pokeapi.co/docs/v2#pokemon
 */
export type PokeAPIListRequest = {
	limit?: number;
	offset?: number;
};

/**
 * @description PokeAPIのポケモン一覧レスポンス内の個別ポケモン情報
 * @see https://pokeapi.co/docs/v2#pokemon
 */
const PokeAPIPokemonResultSchema = z.object({
	name: z.string(), // 英語名
	url: z.string(), // 詳細URL
});

/**
 * @description PokeAPIのポケモン一覧レスポンス型
 * @see https://pokeapi.co/docs/v2#pokemon
 */
const PokeAPIListResponseSchema = z.object({
	count: z.number(),
	next: z.string().nullable(),
	previous: z.string().nullable(),
	results: z.array(PokeAPIPokemonResultSchema),
});

export type PokeAPIListResponse = z.infer<typeof PokeAPIListResponseSchema>;

/**
 * @description PokeAPIのポケモン詳細情報の型定義
 * @see https://pokeapi.co/docs/v2#pokemon
 */
const PokeAPIPokemonDetailSchema = z.object({
	id: z.number(),
	name: z.string(),
	base_experience: z.number().nullable(),
	height: z.number(),
	weight: z.number(),
	is_default: z.boolean(),
	order: z.number(),
	abilities: z.array(
		z.object({
			ability: z.object({
				name: z.string(),
				url: z.string(),
			}),
			is_hidden: z.boolean(),
			slot: z.number(),
		}),
	),
	forms: z.array(
		z.object({
			name: z.string(),
			url: z.string(),
		}),
	),
	sprites: z.object({
		back_default: z.string().nullable(),
		back_female: z.string().nullable(),
		back_shiny: z.string().nullable(),
		back_shiny_female: z.string().nullable(),
		front_default: z.string().nullable(),
		front_female: z.string().nullable(),
		front_shiny: z.string().nullable(),
		front_shiny_female: z.string().nullable(),
		other: z
			.object({
				"dream-world": z
					.object({
						front_default: z.string().nullable().optional(),
						front_female: z.string().nullable().optional(),
					})
					.optional(),
				home: z
					.object({
						front_default: z.string().nullable().optional(),
						front_female: z.string().nullable().optional(),
						front_shiny: z.string().nullable().optional(),
						front_shiny_female: z.string().nullable().optional(),
					})
					.optional(),
				"official-artwork": z
					.object({
						front_default: z.string().nullable().optional(),
						front_shiny: z.string().nullable().optional(),
					})
					.optional(),
				showdown: z.object({}).optional(),
			})
			.optional(),
	}),
	stats: z.array(
		z.object({
			base_stat: z.number(),
			effort: z.number(),
			stat: z.object({
				name: z.string(),
				url: z.string(),
			}),
		}),
	),
	types: z.array(
		z.object({
			slot: z.number(),
			type: z.object({
				name: z.string(),
				url: z.string(),
			}),
		}),
	),
});

export type PokeAPIPokemonDetail = z.infer<typeof PokeAPIPokemonDetailSchema>;

/**
 * @description PokeAPIのポケモン種別情報の型定義
 * @see https://pokeapi.co/docs/v2#pokemon-species
 */
const PokeAPIPokemonSpeciesSchema = z.object({
	id: z.number(),
	name: z.string(),
	names: z.array(
		z.object({
			name: z.string(),
			language: z.object({
				name: z.string(),
				url: z.string(),
			}),
		}),
	),
	generation: z.object({
		name: z.string(),
		url: z.string(),
	}),
	is_main_series: z.boolean(),
});

export type PokeAPIPokemonSpecies = z.infer<typeof PokeAPIPokemonSpeciesSchema>;

/**
 * ============================================================================
 * アプリケーション内で利用する型定義（export用）
 * ============================================================================
 * PokeAPi専用型を組み合わせ、プロジェクト内で使いやすいように加工した型定義。
 */

/**
 * @description ポケモン一覧取得（日本語名対応）のレスポンス型
 * PokeAPI専用のリストレスポンス型をベースに、日本語名対応したポケモンを返す。
 */
const PokemonListSchema = PokeAPIListResponseSchema.omit({
	results: true,
}).extend({
	results: z.array(
		PokeAPIPokemonResultSchema.omit({ name: true }).extend({
			id: z.number(), // ID
			name: z.string(), // 日本語名
			enName: z.string(), // 英語名
			imageUrl: z.string(), // 画像URL
		}),
	),
});

export type PokemonListResponse = z.infer<typeof PokemonListSchema>;
export type PokemonList = PokemonListResponse["results"];

/**
 * @description ポケモン詳細情報型（日本語名対応）
 * PokeAPI詳細情報とポケモン種別情報を組み合わせ、日本語名を追加したアプリケーション用型。
 */
export type PokemonDetail = PokeAPIPokemonDetail & {
	name: string; // 日本語名
	enName: string; // 英語名
	species: PokeAPIPokemonSpecies;
};
