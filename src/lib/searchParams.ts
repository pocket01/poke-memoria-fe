/**
 * @description クエリパラメータの定義とサーバサイド用のsearchParamsキャッシュの作成
 */
import {
	createSearchParamsCache,
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
} from "nuqs/server";

/**
 * 履歴書作成 - 相棒ポケモン選択のクエリパラメータの定義
 */
export const CreatePartnersSearchParams = {
	selectedPokemons: parseAsArrayOf(parseAsInteger).withDefault([]),
	showPokemonDialog: parseAsBoolean.withDefault(false),
};

/**
 * サーバサイド用のsearchParamsキャッシュ作成
 */
export const searchParamsCache = createSearchParamsCache(
	CreatePartnersSearchParams,
);
