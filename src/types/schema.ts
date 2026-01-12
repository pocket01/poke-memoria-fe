/**
 * ポケメモリアにおけるユーザーの「思い出」を管理する核となる型定義
 */

/**
 * ビジュアルスタイルの種別
 * - paper: Authentic Paper（誠実・重厚・公文書）
 * - neo_gb: Neo Gameboy（懐古・モダン・洗練）
 * - retro_rg: Retro Red/Green（冒険・原点・ドット）
 */
export type VisualStyle = "paper" | "neo_gb" | "retro_rg";

/**
 * プレイステータス
 * - r: release（発売当時に）
 * - l: later（後からプレイ）
 * - m: remake（リメイクで）
 */
export type PlayStatus = "r" | "l" | "m";

/**
 * 作品ごとのプレイ記録
 */
export type TitleHistory = {
	/** 作品ID（例: rg, gs, rs） */
	titleId: string;
	/** プレイステータス */
	status: PlayStatus;
};

/**
 * 相棒ポケモンの情報
 */
export type PartnerPokemon = {
	/** ポケモンの図鑑番号（未選択の場合はnull） */
	pokemonId: number | null;
	/** 相棒へのコメント（最大20文字） */
	comment: string;
};

/**
 * 履歴書の全体構造：Memories
 * ユーザーが入力した「思い出」の集合体
 */
export type Memories = {
	/** ビジュアルスタイル */
	style: VisualStyle;
	/** トレーナー名 */
	trainerName: string;
	/** 冒険を始めた年 */
	startedYear: string;
	/** 原点の作品ID */
	originTitleId: string;
	/** プレイ歴の配列 */
	history: TitleHistory[];
	/** 相棒ポケモンの配列（最大6匹） */
	partners: PartnerPokemon[];
	/** タグの配列 */
	tags: string[];
	/** 自由記述メッセージ（最大200文字） */
	freeMessage: string;
};

/**
 * URLパラメータのキー名定義
 * URL短縮のために2文字程度の短縮形を使用
 */
export const URL_PARAM_KEYS = {
	/** スタイル */
	STYLE: "st",
	/** トレーナー名 */
	TRAINER_NAME: "tn",
	/** 開始年 */
	STARTED_YEAR: "sy",
	/** 原点作品ID */
	ORIGIN_TITLE_ID: "ot",
	/** プレイ歴 */
	HISTORY: "hi",
	/** 相棒ポケモンID（p1i, p2i, ...） */
	PARTNER_ID_PREFIX: "p",
	PARTNER_ID_SUFFIX: "i",
	/** 相棒コメント（p1c, p2c, ...） */
	PARTNER_COMMENT_SUFFIX: "c",
	/** タグ */
	TAGS: "tg",
	/** メッセージ */
	MESSAGE: "ms",
} as const;

/**
 * バリデーション定数
 */
export const VALIDATION_LIMITS = {
	/** 相棒コメントの最大文字数 */
	PARTNER_COMMENT_MAX_LENGTH: 20,
	/** 自由記述メッセージの最大文字数 */
	FREE_MESSAGE_MAX_LENGTH: 200,
	/** 相棒ポケモンの最大数 */
	MAX_PARTNERS: 6,
} as const;

/**
 * ポケモン世代データの型定義
 */
export type PokemonGenerations = {
	id: string;
	name: string;
	generation: string;
	year: string;
	bgColor: string;
};
