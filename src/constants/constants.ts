import type { Memories, PlayStatus, VisualStyle } from "@/types/schema";

/**
 * ポケモン歴代タイトルマスターデータ
 * IDはURLパラメータで使用するため、極力短く設定
 */
export const POKEMON_TITLES = [
	// 第1世代
	{ id: "rg", name: "赤・緑・青・ピカチュウ", generation: 1, color: "#FF1111" },
	// 第2世代
	{ id: "gs", name: "金・銀・クリスタル", generation: 2, color: "#DAA520" },
	// 第3世代
	{
		id: "rs",
		name: "ルビー・サファイア・エメラルド",
		generation: 3,
		color: "#4169E1",
	},
	{
		id: "frlg",
		name: "ファイアレッド・リーフグリーン",
		generation: 3,
		color: "#32CD32",
	},
	// 第4世代
	{
		id: "dp",
		name: "ダイヤモンド・パール・プラチナ",
		generation: 4,
		color: "#7B68EE",
	},
	{
		id: "hgss",
		name: "ハートゴールド・ソウルシルバー",
		generation: 4,
		color: "#E6BE00",
	},
	// 第5世代
	{ id: "bw", name: "ブラック・ホワイト", generation: 5, color: "#444444" },
	// 第6世代
	{ id: "xy", name: "X・Y", generation: 6, color: "#3B52A1" },
	{
		id: "oras",
		name: "オメガルビー・アルファサファイア",
		generation: 6,
		color: "#FF4500",
	},
	// 第7世代
	{ id: "sm", name: "サン・ムーン", generation: 7, color: "#FF8C00" },
	// 第8世代
	{ id: "ss", name: "ソード・シールド", generation: 8, color: "#00BFFF" },
	{
		id: "bdsp",
		name: "ブリリアントダイヤモンド・シャイニングパール",
		generation: 8,
		color: "#6495ED",
	},
	{
		id: "la",
		name: "Pokémon LEGENDS アルセウス",
		generation: 8,
		color: "#2F4F4F",
	},
	// 第9世代
	{
		id: "sv",
		name: "スカーレット・バイオレット",
		generation: 9,
		color: "#800080",
	},
	{ id: "lza", name: "Pokémon LEGENDS Z-A", generation: 9, color: "#70C080" },
] as const;

/**
 * プレイ状態の選択肢（ラベルとIDの対応）
 */
export const PLAY_STATUS_OPTIONS: Array<{ id: PlayStatus; label: string }> = [
	{ id: "r", label: "発売当時に" },
	{ id: "l", label: "後からプレイ" },
	{ id: "m", label: "リメイクで" },
] as const;

/**
 * 履歴書に添えるタグ候補
 */
export const PRESET_TAGS = [
	"色違い勢",
	"対戦ガチ勢",
	"図鑑コンプ",
	"旅パ重視",
	"考察勢",
	"リボンコンプ",
	"オシャボ勢",
	"コンテスト勢",
] as const;

/**
 * ビジュアルスタイル設定
 */
export const VISUAL_STYLES: Array<{
	id: VisualStyle;
	name: string;
	description: string;
}> = [
	{ id: "paper", name: "Authentic Paper", description: "誠実・重厚・公文書" },
	{ id: "neo_gb", name: "Neo Gameboy", description: "懐古・モダン・洗練" },
	{
		id: "retro_rg",
		name: "Retro Red/Green",
		description: "冒険・原点・ドット",
	},
] as const;

/**
 * デフォルトの相棒ポケモンデータ（未選択状態）
 */
export const DEFAULT_PARTNER = {
	pokemonId: null,
	comment: "",
} as const;

/**
 * デフォルトのMemoriesデータ
 */
export const DEFAULT_MEMORIES = {
	style: "paper" as const,
	trainerName: "",
	startedYear: "",
	originTitleId: "",
	history: [],
	partners: Array(6)
		.fill(null)
		.map(() => ({ ...DEFAULT_PARTNER })),
	tags: [],
	freeMessage: "",
} as const satisfies Memories;
