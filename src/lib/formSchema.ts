import { z } from "zod";
import { VALIDATION_LIMITS } from "@/types/schema";

/**
 * 相棒ポケモンのスキーマ
 */
const partnerPokemonSchema = z
	.object({
		/** ポケモンのID（未選択の場合はnull） */
		pokemonId: z.number(),
		/** 相棒へのコメント（最大20文字） */
		comment: z.string().max(VALIDATION_LIMITS.PARTNER_COMMENT_MAX_LENGTH),
	})
	.nullable();

/**
 * 作品ごとのプレイ記録のスキーマ
 */
const titleHistorySchema = z.object({
	/** 作品ID（例: rg, gs, rs） */
	titleId: z.string(),
});

/**
 * フォーム全体のスキーマ
 */
export const formSchema = z.object({
	/** 原点の作品ID */
	originTitleId: z.number().min(1).max(9).nullable(),
	/** プレイ歴の配列 */
	history: z.array(titleHistorySchema),
	/** 相棒ポケモンの配列（最大6匹） */
	partners: z.array(partnerPokemonSchema).max(VALIDATION_LIMITS.MAX_PARTNERS),
	/** トレーナープロフィール */
	profile: z.object({
		/** トレーナー名 */
		name: z.string().max(VALIDATION_LIMITS.TRAINER_NAME_MAX_LENGTH),
		/** 自由記述 */
		freeMessage: z.string().max(VALIDATION_LIMITS.FREE_MESSAGE_MAX_LENGTH),
	}),
});

/**
 * フォームデータの型定義
 */
export type FormData = z.infer<typeof formSchema>;
