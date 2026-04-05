/**
 * ポケメモリアにおけるユーザーの「思い出」を管理する核となる型定義
 */

/**
 * 作品ごとのプレイ記録
 */
export type TitleHistory = {
	/** 作品ID（例: rg, gs, rs） */
	titleId: string;
};

/**
 * 相棒ポケモンの情報
 */
export type PartnerPokemon = {
	/** ポケモンのID */
	pokemonId: number;
	/** 相棒へのコメント（最大20文字） */
	comment: string;
};

/**
 * トレーナープロフィールの情報
 */
export type TrainerProfile = {
	/** トレーナー名 */
	name: string;
	/** 自由記述 */
	freeMessage: string;
};

/**
 * 履歴書の全体構造：Memories
 * ユーザーが入力した「思い出」の集合体
 */
export type Memories = {
	/** 原点の作品ID */
	originTitleId: number;
	/** プレイ歴の配列 */
	history: TitleHistory[];
	/** 相棒ポケモンの配列（最大6匹） */
	partners: (PartnerPokemon | null)[];
	/** トレーナープロフィール */
	profile: TrainerProfile;
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
	/** 相棒ポケモンの最大数 */
	MAX_PARTNERS: 6,
	/** トレーナー名の最大文字数 */
	TRAINER_NAME_MAX_LENGTH: 30,
	/** 自由記述メッセージの最大文字数 */
	FREE_MESSAGE_MAX_LENGTH: 200,
} as const;

/**
 * ポケモン世代データの型定義
 */
export type PokemonGenerations = {
	gen: number;
	name: string;
	generation: string;
	year: string;
};

/**
 * ダイアログの開閉状態を管理するための型定義
 */
export type DialogOpen = {
	isOpen: boolean;
};
