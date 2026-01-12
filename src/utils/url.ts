import type { Memories } from "@/types/schema";
import { URL_PARAM_KEYS } from "@/types/schema";

/**
 * URLSearchParamsからMemoriesオブジェクトを生成
 */
export function parseUrlParams(
	searchParams: URLSearchParams,
): Partial<Memories> {
	const memories: Partial<Memories> = {};

	// スタイル
	const style = searchParams.get(URL_PARAM_KEYS.STYLE);
	if (style === "paper" || style === "neo_gb" || style === "retro_rg") {
		memories.style = style;
	}

	// トレーナー名
	const trainerName = searchParams.get(URL_PARAM_KEYS.TRAINER_NAME);
	if (trainerName) {
		memories.trainerName = trainerName;
	}

	// 開始年
	const startedYear = searchParams.get(URL_PARAM_KEYS.STARTED_YEAR);
	if (startedYear) {
		memories.startedYear = startedYear;
	}

	// 原点作品ID
	const originTitleId = searchParams.get(URL_PARAM_KEYS.ORIGIN_TITLE_ID);
	if (originTitleId) {
		memories.originTitleId = originTitleId;
	}

	// プレイ歴
	const history = searchParams.get(URL_PARAM_KEYS.HISTORY);
	if (history) {
		memories.history = history.split(",").map((item) => {
			const [titleId, status] = item.split(".");
			return { titleId, status: status as "r" | "l" | "m" };
		});
	}

	// 相棒ポケモン
	const partners = [];
	for (let i = 1; i <= 6; i++) {
		const idKey = `${URL_PARAM_KEYS.PARTNER_ID_PREFIX}${i}${URL_PARAM_KEYS.PARTNER_ID_SUFFIX}`;
		const commentKey = `${URL_PARAM_KEYS.PARTNER_ID_PREFIX}${i}${URL_PARAM_KEYS.PARTNER_COMMENT_SUFFIX}`;

		const pokemonId = searchParams.get(idKey);
		const comment = searchParams.get(commentKey) || "";

		if (pokemonId) {
			partners.push({
				pokemonId: Number(pokemonId),
				comment,
			});
		} else {
			partners.push({
				pokemonId: null,
				comment: "",
			});
		}
	}
	if (partners.length > 0) {
		memories.partners = partners;
	}

	// タグ
	const tags = searchParams.get(URL_PARAM_KEYS.TAGS);
	if (tags) {
		memories.tags = tags.split(",");
	}

	// メッセージ
	const message = searchParams.get(URL_PARAM_KEYS.MESSAGE);
	if (message) {
		memories.freeMessage = message;
	}

	return memories;
}

/**
 * MemoriesオブジェクトからURLSearchParamsを生成
 */
export function createUrlParams(memories: Memories): URLSearchParams {
	const params = new URLSearchParams();

	// スタイル
	if (memories.style) {
		params.set(URL_PARAM_KEYS.STYLE, memories.style);
	}

	// トレーナー名
	if (memories.trainerName) {
		params.set(URL_PARAM_KEYS.TRAINER_NAME, memories.trainerName);
	}

	// 開始年
	if (memories.startedYear) {
		params.set(URL_PARAM_KEYS.STARTED_YEAR, memories.startedYear);
	}

	// 原点作品ID
	if (memories.originTitleId) {
		params.set(URL_PARAM_KEYS.ORIGIN_TITLE_ID, memories.originTitleId);
	}

	// プレイ歴
	if (memories.history && memories.history.length > 0) {
		const historyStr = memories.history
			.map((h) => `${h.titleId}.${h.status}`)
			.join(",");
		params.set(URL_PARAM_KEYS.HISTORY, historyStr);
	}

	// 相棒ポケモン
	memories.partners.forEach((partner, index) => {
		if (partner.pokemonId) {
			const idKey = `${URL_PARAM_KEYS.PARTNER_ID_PREFIX}${index + 1}${URL_PARAM_KEYS.PARTNER_ID_SUFFIX}`;
			const commentKey = `${URL_PARAM_KEYS.PARTNER_ID_PREFIX}${index + 1}${URL_PARAM_KEYS.PARTNER_COMMENT_SUFFIX}`;

			params.set(idKey, String(partner.pokemonId));
			if (partner.comment) {
				params.set(commentKey, partner.comment);
			}
		}
	});

	// タグ
	if (memories.tags && memories.tags.length > 0) {
		params.set(URL_PARAM_KEYS.TAGS, memories.tags.join(","));
	}

	// メッセージ
	if (memories.freeMessage) {
		params.set(URL_PARAM_KEYS.MESSAGE, memories.freeMessage);
	}

	return params;
}
