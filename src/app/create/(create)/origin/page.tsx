import Origin from "@/components/organisms/Origin";

// ポケモン世代データ
async function getPokemonGenerations() {
	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));
	await sleep(1000); // 疑似的な遅延
	return [
		{
			id: "1",
			name: "赤・緑",
			generation: "第一世代",
			year: "1996年",
			bgColor: "from-red-400 to-red-600",
		},
		{
			id: "2",
			name: "金・銀",
			generation: "第二世代",
			year: "1999年",
			bgColor: "from-yellow-400 to-yellow-600",
		},
		{
			id: "3",
			name: "ルビー・サファイア",
			generation: "第三世代",
			year: "2002年",
			bgColor: "from-blue-400 to-blue-600",
		},
		{
			id: "4",
			name: "ダイヤモンド・パール",
			generation: "第四世代",
			year: "2006年",
			bgColor: "from-purple-400 to-purple-600",
		},
		{
			id: "5",
			name: "ブラック・ホワイト",
			generation: "第五世代",
			year: "2010年",
			bgColor: "from-gray-700 to-gray-900",
		},
		{
			id: "6",
			name: "X・Y",
			generation: "第六世代",
			year: "2013年",
			bgColor: "from-cyan-400 to-cyan-600",
		},
		{
			id: "7",
			name: "サン・ムーン",
			generation: "第七世代",
			year: "2016年",
			bgColor: "from-orange-400 to-orange-600",
		},
		{
			id: "8",
			name: "ソード・シールド",
			generation: "第八世代",
			year: "2019年",
			bgColor: "from-green-400 to-green-600",
		},
		{
			id: "9",
			name: "スカーレット・バイオレット",
			generation: "第九世代",
			year: "2022年",
			bgColor: "from-pink-400 to-pink-600",
		},
	];
}
export default async function OriginPage() {
	const data = await getPokemonGenerations();
	return <Origin data={data} />;
}
