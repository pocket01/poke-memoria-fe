import { z } from "zod";
import { VALIDATION_LIMITS } from "@/types/schema";

/**
 * 相棒ポケモンのスキーマ
 */
const partnerPokemonSchema = z.object({
	/** ポケモンの図鑑番号（未選択の場合はnull） */
	pokemonId: z.number().nullable(),
	/** 相棒へのコメント（最大20文字） */
	comment: z.string().max(VALIDATION_LIMITS.PARTNER_COMMENT_MAX_LENGTH),
});

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
	/** ビジュアルスタイル */
	style: z.enum(["paper", "neo_gb", "retro_rg"]).nullable(),
	/** トレーナー名 */
	trainerName: z.string().nullable(),
	/** 冒険を始めた年 */
	startedYear: z.string().nullable(),
	/** 相棒ポケモンの配列（最大6匹） */
	partners: z.array(partnerPokemonSchema).max(VALIDATION_LIMITS.MAX_PARTNERS),
	/** タグの配列 */
	tags: z.array(z.string()),
	/** 自由記述メッセージ（最大200文字） */
	freeMessage: z.string().max(VALIDATION_LIMITS.FREE_MESSAGE_MAX_LENGTH),
});

/**
 * フォームデータの型定義
 */
export type FormData = z.infer<typeof formSchema>;
