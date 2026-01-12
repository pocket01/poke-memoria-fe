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
			bgColor: "rgba(239, 68, 68, 0.13)",
		},
		{
			id: "2",
			name: "金・銀",
			generation: "第二世代",
			year: "1999年",
			bgColor: "rgba(234, 179, 8, 0.13)",
		},
		{
			id: "3",
			name: "ルビー・サファイア",
			generation: "第三世代",
			year: "2002年",
			bgColor: "rgba(59, 130, 246, 0.13)",
		},
		{
			id: "4",
			name: "ダイヤモンド・パール",
			generation: "第四世代",
			year: "2006年",
			bgColor: "rgba(139, 92, 246, 0.13)",
		},
		{
			id: "5",
			name: "ブラック・ホワイト",
			generation: "第五世代",
			year: "2010年",
			bgColor: "rgba(55, 65, 81, 0.13)",
		},
		{
			id: "6",
			name: "X・Y",
			generation: "第六世代",
			year: "2013年",
			bgColor: "rgba(6, 182, 212, 0.13)",
		},
		{
			id: "7",
			name: "サン・ムーン",
			generation: "第七世代",
			year: "2016年",
			bgColor: "rgba(249, 115, 22, 0.13)",
		},
		{
			id: "8",
			name: "ソード・シールド",
			generation: "第八世代",
			year: "2019年",
			bgColor: "rgba(16, 185, 129, 0.13)",
		},
		{
			id: "9",
			name: "スカーレット・バイオレット",
			generation: "第九世代",
			year: "2022年",
			bgColor: "rgba(236, 72, 153, 0.13)",
		},
	];
}
export default async function OriginPage() {
	const data = await getPokemonGenerations();
	return <Origin data={data} />;
}
