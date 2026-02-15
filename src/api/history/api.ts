import type { GameRelease } from "@/components/organisms/History";

/**
 * ポケモンの各タイトルデータ取得API
 * @returns ポケモンの各タイトルデータ配列
 */
export async function getPokemonTitles(): Promise<GameRelease[]> {
	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(1000); // 疑似的な遅延
	return [
		{
			year: 1996,
			generation: 1,
			titles: [
				{
					id: "gen1-red",
					name: "赤",
					region: "カントー",
				},
				{
					id: "gen1-green",
					name: "緑",
					region: "カントー",
				},
				{
					id: "gen1-blue",
					name: "青",
					region: "カントー",
				},
			],
		},
		{
			year: 1998,
			generation: 1,
			titles: [
				{
					id: "gen1-yellow",
					name: "ピカチュウ",
					region: "カントー",
				},
			],
		},
		{
			year: 1999,
			generation: 2,
			titles: [
				{
					id: "gen2-gold",
					name: "金",
					region: "ジョウト",
				},
				{
					id: "gen2-silver",
					name: "銀",
					region: "ジョウト",
				},
			],
		},
		{
			year: 2000,
			generation: 2,
			titles: [
				{
					id: "gen2-crystal",
					name: "クリスタル",
					region: "ジョウト",
				},
			],
		},
		{
			year: 2002,
			generation: 3,
			titles: [
				{
					id: "gen3-ruby",
					name: "ルビー",
					region: "ホウエン",
				},
				{
					id: "gen3-sapphire",
					name: "サファイア",
					region: "ホウエン",
				},
			],
		},
		{
			year: 2004,
			generation: 3,
			titles: [
				{
					id: "gen3-fr",
					name: "ファイアレッド",
					region: "カントー",
				},
				{
					id: "gen3-lg",
					name: "リーフグリーン",
					region: "カントー",
				},
				{
					id: "gen3-emerald",
					name: "エメラルド",
					region: "ホウエン",
				},
			],
		},
		{
			year: 2006,
			generation: 4,
			titles: [
				{
					id: "gen4-diamond",
					name: "ダイヤモンド",
					region: "シンオウ",
				},
				{
					id: "gen4-pearl",
					name: "パール",
					region: "シンオウ",
				},
			],
		},
		{
			year: 2008,
			generation: 4,
			titles: [
				{
					id: "gen4-platinum",
					name: "プラチナ",
					region: "シンオウ",
				},
			],
		},
		{
			year: 2009,
			generation: 4,
			titles: [
				{
					id: "gen4-hg",
					name: "ハートゴールド",
					region: "ジョウト",
				},
				{
					id: "gen4-ss",
					name: "ソウルシルバー",
					region: "ジョウト",
				},
			],
		},
		{
			year: 2010,
			generation: 5,
			titles: [
				{
					id: "gen5-black",
					name: "ブラック",
					region: "イッシュ",
				},
				{
					id: "gen5-white",
					name: "ホワイト",
					region: "イッシュ",
				},
			],
		},
		{
			year: 2012,
			generation: 5,
			titles: [
				{
					id: "gen5-black2",
					name: "ブラック2",
					region: "イッシュ",
				},
				{
					id: "gen5-white2",
					name: "ホワイト2",
					region: "イッシュ",
				},
			],
		},
		{
			year: 2013,
			generation: 6,
			titles: [
				{
					id: "gen6-x",
					name: "X",
					region: "カロス",
				},
				{
					id: "gen6-y",
					name: "Y",
					region: "カロス",
				},
			],
		},
		{
			year: 2014,
			generation: 6,
			titles: [
				{
					id: "gen6-or",
					name: "オメガルビー",
					region: "ホウエン",
				},
				{
					id: "gen6-as",
					name: "アルファサファイア",
					region: "ホウエン",
				},
			],
		},
		{
			year: 2016,
			generation: 7,
			titles: [
				{
					id: "gen7-sun",
					name: "サン",
					region: "アローラ",
				},
				{
					id: "gen7-moon",
					name: "ムーン",
					region: "アローラ",
				},
			],
		},
		{
			year: 2017,
			generation: 7,
			titles: [
				{
					id: "gen7-us",
					name: "ウルトラサン",
					region: "アローラ",
				},
				{
					id: "gen7-um",
					name: "ウルトラムーン",
					region: "アローラ",
				},
			],
		},
		{
			year: 2018,
			generation: 7,
			titles: [
				{
					id: "gen7-lgp",
					name: "Let's Go! ピカチュウ",
					region: "カントー",
				},
				{
					id: "gen7-lge",
					name: "Let's Go! イーブイ",
					region: "カントー",
				},
			],
		},
		{
			year: 2019,
			generation: 8,
			titles: [
				{
					id: "gen8-sword",
					name: "ソード",
					region: "ガラル",
				},
				{
					id: "gen8-shield",
					name: "シールド",
					region: "ガラル",
				},
			],
		},
		{
			year: 2021,
			generation: 8,
			titles: [
				{
					id: "gen8-bd",
					name: "ブリリアントダイヤモンド",
					region: "シンオウ",
				},
				{
					id: "gen8-sp",
					name: "シャイニングパール",
					region: "シンオウ",
				},
			],
		},
		{
			year: 2022,
			generation: 8,
			titles: [
				{
					id: "gen8-la",
					name: "LEGENDS アルセウス",
					region: "ヒスイ",
				},
			],
		},
		{
			year: 2022,
			generation: 9,
			titles: [
				{
					id: "gen9-scarlet",
					name: "スカーレット",
					region: "パルデア",
				},
				{
					id: "gen9-violet",
					name: "バイオレット",
					region: "パルデア",
				},
			],
		},
		{
			year: 2025,
			generation: 9,
			titles: [
				{
					id: "gen9-za",
					name: "LEGENDS ZA",
					region: "カロス",
				},
			],
		},
	];
}
