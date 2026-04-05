import type { Memories } from "@/types/schema";

/**
 * @todo
 * ポケモン歴代タイトルマスターデータ
 * IDはURLパラメータで使用するため、genX-YYY形式（X：世代、YYY：タイトル名）を採用
 * 1つのIDが1つのタイトルを保持
 */
export const POKEMON_TITLES = [
	// 第1世代
	{ id: "gen1-red", name: "赤", generation: 1, color: "#FF1111" },
	{ id: "gen1-green", name: "緑", generation: 1, color: "#00FF00" },
	{ id: "gen1-blue", name: "青", generation: 1, color: "#0000FF" },
	{ id: "gen1-yellow", name: "ピカチュウ", generation: 1, color: "#FFFF00" },
	// 第2世代
	{ id: "gen2-gold", name: "金", generation: 2, color: "#FFD700" },
	{ id: "gen2-silver", name: "銀", generation: 2, color: "#C0C0C0" },
	{ id: "gen2-crystal", name: "クリスタル", generation: 2, color: "#DAA520" },
	// 第3世代
	{ id: "gen3-ruby", name: "ルビー", generation: 3, color: "#FF1111" },
	{ id: "gen3-sapphire", name: "サファイア", generation: 3, color: "#0000FF" },
	{ id: "gen3-emerald", name: "エメラルド", generation: 3, color: "#00FF00" },
	{
		id: "gen3-fr",
		name: "ファイアレッド",
		generation: 3,
		color: "#FF6347",
	},
	{
		id: "gen3-lg",
		name: "リーフグリーン",
		generation: 3,
		color: "#228B22",
	},
	// 第4世代
	{ id: "gen4-diamond", name: "ダイヤモンド", generation: 4, color: "#87CEEB" },
	{ id: "gen4-pearl", name: "パール", generation: 4, color: "#FFC0CB" },
	{ id: "gen4-platinum", name: "プラチナ", generation: 4, color: "#E5E4E2" },
	{
		id: "gen4-heartgold",
		name: "ハートゴールド",
		generation: 4,
		color: "#FFD700",
	},
	{
		id: "gen4-soulsilver",
		name: "ソウルシルバー",
		generation: 4,
		color: "#C0C0C0",
	},
	// 第5世代
	{ id: "gen5-black", name: "ブラック", generation: 5, color: "#000000" },
	{ id: "gen5-white", name: "ホワイト", generation: 5, color: "#FFFFFF" },
	// 第6世代
	{ id: "gen6-x", name: "X", generation: 6, color: "#3B52A1" },
	{ id: "gen6-y", name: "Y", generation: 6, color: "#E6B800" },
	{
		id: "gen6-omegaruby",
		name: "オメガルビー",
		generation: 6,
		color: "#FF4500",
	},
	{
		id: "gen6-alphasapphire",
		name: "アルファサファイア",
		generation: 6,
		color: "#4169E1",
	},
	// 第7世代
	{ id: "gen7-sun", name: "サン", generation: 7, color: "#FF8C00" },
	{ id: "gen7-moon", name: "ムーン", generation: 7, color: "#4B0082" },
	// 第8世代
	{ id: "gen8-sword", name: "ソード", generation: 8, color: "#00BFFF" },
	{ id: "gen8-shield", name: "シールド", generation: 8, color: "#FFD700" },
	{
		id: "gen8-brilliant-diamond",
		name: "ブリリアントダイヤモンド",
		generation: 8,
		color: "#6495ED",
	},
	{
		id: "gen8-shining-pearl",
		name: "シャイニングパール",
		generation: 8,
		color: "#FFC0CB",
	},
	{
		id: "gen8-legends-arceus",
		name: "Pokémon LEGENDS アルセウス",
		generation: 8,
		color: "#2F4F4F",
	},
	// 第9世代
	{ id: "gen9-scarlet", name: "スカーレット", generation: 9, color: "#DC143C" },
	{ id: "gen9-violet", name: "バイオレット", generation: 9, color: "#9400D3" },
	{
		id: "gen9-legends-za",
		name: "Pokémon LEGENDS Z-A",
		generation: 9,
		color: "#70C080",
	},
] as const;

/** @todo ビジュアルスタイルは後々。世代ごとの見た目を設定したいな。 */
// /**
//  * ビジュアルスタイル設定
//  */
// export const VISUAL_STYLES: Array<{
// 	id: VisualStyle;
// 	name: string;
// 	description: string;
// }> = [
// 	{ id: "paper", name: "Authentic Paper", description: "誠実・重厚・公文書" },
// 	{ id: "neo_gb", name: "Neo Gameboy", description: "懐古・モダン・洗練" },
// 	{
// 		id: "retro_rg",
// 		name: "Retro Red/Green",
// 		description: "冒険・原点・ドット",
// 	},
// ] as const;

/**
 * デフォルトのMemoriesデータ
 */
export const DEFAULT_MEMORIES: Memories = {
	originTitleId: 0,
	history: [],
	partners: Array(6).fill(null),
	profile: {
		name: "",
		freeMessage: "",
	},
};
