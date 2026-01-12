import { Clock, RotateCcw, Zap } from "lucide-react";
import { Button } from "../atoms/button";

// ポケモン作品データ
const titles = [
	{
		id: 1,
		name: "赤・緑・青・ピカチュウ",
		region: "カントー地方",
		year: "1996",
	},
	{ id: 2, name: "金・銀・クリスタル", region: "ジョウト地方", year: "1999" },
	{
		id: 3,
		name: "ルビー・サファイア・エメラルド",
		region: "ホウエン地方",
		year: "2002",
	},
	{
		id: 4,
		name: "ファイアレッド・リーフグリーン",
		region: "カントー地方",
		year: "2004",
	},
	{
		id: 5,
		name: "ダイヤモンド・パール・プラチナ",
		region: "シンオウ地方",
		year: "2006",
	},
	{
		id: 6,
		name: "ハートゴールド・ソウルシルバー",
		region: "ジョウト地方",
		year: "2009",
	},
	{ id: 7, name: "ブラック・ホワイト", region: "イッシュ地方", year: "2010" },
	{ id: 8, name: "ブラック2・ホワイト2", region: "イッシュ地方", year: "2012" },
	{ id: 9, name: "X・Y", region: "カロス地方", year: "2013" },
	{
		id: 10,
		name: "オメガルビー・アルファサファイア",
		region: "ホウエン地方",
		year: "2014",
	},
	{ id: 11, name: "サン・ムーン", region: "アローラ地方", year: "2016" },
	{
		id: 12,
		name: "ウルトラサン・ウルトラムーン",
		region: "アローラ地方",
		year: "2017",
	},
	{ id: 13, name: "ソード・シールド", region: "ガラル地方", year: "2019" },
	{
		id: 14,
		name: "ブリリアントダイヤモンド・シャイニングパール",
		region: "シンオウ地方",
		year: "2021",
	},
	{
		id: 15,
		name: "Pokémon LEGENDS アルセウス",
		region: "ヒスイ地方",
		year: "2022",
	},
	{
		id: 16,
		name: "スカーレット・バイオレット",
		region: "パルデア地方",
		year: "2022",
	},
];

// type StampType = "release" | "later" | "remake";

/**
 * 【軌跡】コンポーネント
 * @returns
 */
export default function History() {
	// const [selectedTitles, setSelectedTitles] = useState<Map<number, StampType>>(
	// 	new Map(),
	// );
	// const [stampMode, setStampMode] = useState<StampType>("release");

	// const toggleTitle = (titleId: number) => {
	// 	const newSelected = new Map(selectedTitles);
	// 	if (newSelected.get(titleId) === stampMode) {
	// 		newSelected.delete(titleId);
	// 	} else {
	// 		newSelected.set(titleId, stampMode);
	// 	}
	// 	setSelectedTitles(newSelected);
	// };

	// const getStampIcon = (type: StampType) => {
	// 	switch (type) {
	// 		case "release":
	// 			return <Clock size={16} />;
	// 		case "later":
	// 			return <Zap size={16} />;
	// 		case "remake":
	// 			return <RotateCcw size={16} />;
	// 	}
	// };

	return (
		<main className="flex-1 px-4 py-8">
			<div className="max-w-4xl mx-auto">
				<div className="mb-8">
					<h2 className="text-4xl font-normal mb-2 text-center">
						あなたが旅した地方と作品
					</h2>
					<p className="text-gray-600 text-center mb-6">
						プレイした作品にスタンプを押してください
					</p>
					<div className="bg-blue-50 rounded-full py-3 px-6 inline-flex items-center gap-3 mx-auto block w-fit">
						<span className="text-2xl font-bold text-blue-600">
							{/* {selectedTitles.size} */}
						</span>
						<span className="text-gray-600">作品プレイ済み</span>
					</div>
				</div>

				{/* スタンプ選択 */}
				<div className="flex gap-4 justify-center mb-8">
					<Button type="button">
						<Clock size={16} />
						<span>発売時</span>
					</Button>
					<Button type="button">
						<Zap size={16} />
						<span>後から</span>
					</Button>
					<Button type="button">
						<RotateCcw size={16} />
						<span>リメイク</span>
					</Button>
				</div>

				{/* 作品リスト */}
				<div className="space-y-6">
					<div className="w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 absolute left-8"></div>
					{titles.map((title) => (
						<div key={title.id} className="relative flex items-center gap-4">
							<div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-500 font-mono">
								{title.year}
							</div>
							<Button type="button">
								<div className="flex items-center justify-between">
									<div className="text-left">
										<h3 className="text-lg font-bold">{title.name}</h3>
										<p className="text-sm text-gray-600">{title.region}</p>
									</div>
									{/* {selectedTitles.has(title.id) && (
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
												selectedTitles.get(title.id) === "release"
													? "bg-red-500"
													: selectedTitles.get(title.id) === "later"
														? "bg-blue-500"
														: "bg-purple-500"
											}`}
										>
											{getStampIcon(selectedTitles.get(title.id) ?? "release")}
										</div>
									)} */}
								</div>
							</Button>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
