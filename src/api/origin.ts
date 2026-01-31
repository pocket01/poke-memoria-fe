import type { PokemonGenerations } from "@/types/schema";

/**
 * ポケモンの各世代データ取得API
 * @returns ポケモンの各世代データ配列
 */
export async function getPokemonGenerations(): Promise<PokemonGenerations[]> {
	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(1000); // 疑似的な遅延
	return [
		{
			gen: 1,
			name: "赤・緑",
			generation: "第一世代",
			year: "1996年",
		},
		{
			gen: 2,
			name: "金・銀",
			generation: "第二世代",
			year: "1999年",
		},
		{
			gen: 3,
			name: "ルビー・サファイア",
			generation: "第三世代",
			year: "2002年",
		},
		{
			gen: 4,
			name: "ダイヤモンド・パール",
			generation: "第四世代",
			year: "2006年",
		},
		{
			gen: 5,
			name: "ブラック・ホワイト",
			generation: "第五世代",
			year: "2010年",
		},
		{
			gen: 6,
			name: "X・Y",
			generation: "第六世代",
			year: "2013年",
		},
		{
			gen: 7,
			name: "サン・ムーン",
			generation: "第七世代",
			year: "2016年",
		},
		{
			gen: 8,
			name: "ソード・シールド",
			generation: "第八世代",
			year: "2019年",
		},
		{
			gen: 9,
			name: "スカーレット・バイオレット",
			generation: "第九世代",
			year: "2022年",
		},
	];
}
