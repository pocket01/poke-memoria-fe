import { type GameEntry, History } from "@/components/organisms/History";

const timeline: GameEntry[] = [
	{
		id: "gen1",
		title: "赤・緑・青・ピカチュウ",
		region: "カントー",
		year: 1996,
		generation: 1,
	},
	{
		id: "gen2",
		title: "金・銀・クリスタル",
		region: "ジョウト",
		year: 1999,
		generation: 2,
	},
	{
		id: "gen3",
		title: "ルビー・サファイア・エメラルド",
		region: "ホウエン",
		year: 2002,
		generation: 3,
	},
	{
		id: "gen3-fr",
		title: "ファイアレッド・リーフグリーン",
		region: "カントー",
		year: 2004,
		generation: 3,
	},
	{
		id: "gen4",
		title: "ダイヤモンド・パール・プラチナ",
		region: "シンオウ",
		year: 2006,
		generation: 4,
	},
	{
		id: "gen4-hg",
		title: "ハートゴールド・ソウルシルバー",
		region: "ジョウト",
		year: 2009,
		generation: 4,
	},
	{
		id: "gen5",
		title: "ブラック・ホワイト",
		region: "イッシュ",
		year: 2010,
		generation: 5,
	},
	{
		id: "gen5-2",
		title: "ブラック2・ホワイト2",
		region: "イッシュ",
		year: 2012,
		generation: 5,
	},
	{ id: "gen6", title: "X・Y", region: "カロス", year: 2013, generation: 6 },
	{
		id: "gen6-or",
		title: "オメガルビー・アルファサファイア",
		region: "ホウエン",
		year: 2014,
		generation: 6,
	},
	{
		id: "gen7",
		title: "サン・ムーン",
		region: "アローラ",
		year: 2016,
		generation: 7,
	},
	{
		id: "gen7-us",
		title: "ウルトラサン・ウルトラムーン",
		region: "アローラ",
		year: 2017,
		generation: 7,
	},
	{
		id: "gen8",
		title: "ソード・シールド",
		region: "ガラル",
		year: 2019,
		generation: 8,
	},
	{
		id: "gen8-bd",
		title: "ブリリアントダイヤモンド・シャイニングパール",
		region: "シンオウ",
		year: 2021,
		generation: 8,
	},
	{
		id: "gen8-la",
		title: "Pokémon LEGENDS アルセウス",
		region: "ヒスイ",
		year: 2022,
		generation: 8,
	},
	{
		id: "gen9",
		title: "スカーレット・バイオレット",
		region: "パルデア",
		year: 2022,
		generation: 9,
	},
];

export default async function HistoryPage() {
	return <History timeline={timeline} />;
}
