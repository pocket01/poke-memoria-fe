"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// ポケモン世代データ
const generations = [
	{
		id: 1,
		name: "赤・緑",
		generation: "第一世代",
		year: "1996年",
		color: "from-red-400 to-red-600",
	},
	{
		id: 2,
		name: "金・銀",
		generation: "第二世代",
		year: "1999年",
		color: "from-yellow-400 to-yellow-600",
	},
	{
		id: 3,
		name: "ルビー・サファイア",
		generation: "第三世代",
		year: "2002年",
		color: "from-blue-400 to-blue-600",
	},
	{
		id: 4,
		name: "ダイヤモンド・パール",
		generation: "第四世代",
		year: "2006年",
		color: "from-purple-400 to-purple-600",
	},
	{
		id: 5,
		name: "ブラック・ホワイト",
		generation: "第五世代",
		year: "2010年",
		color: "from-gray-700 to-gray-900",
	},
	{
		id: 6,
		name: "X・Y",
		generation: "第六世代",
		year: "2013年",
		color: "from-cyan-400 to-cyan-600",
	},
	{
		id: 7,
		name: "サン・ムーン",
		generation: "第七世代",
		year: "2016年",
		color: "from-orange-400 to-orange-600",
	},
	{
		id: 8,
		name: "ソード・シールド",
		generation: "第八世代",
		year: "2019年",
		color: "from-green-400 to-green-600",
	},
	{
		id: 9,
		name: "スカーレット・バイオレット",
		generation: "第九世代",
		year: "2022年",
		color: "from-pink-400 to-pink-600",
	},
];

export default function OriginPage() {
	const router = useRouter();
	const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
		null,
	);

	const handleNext = () => {
		if (selectedGeneration) {
			router.push("/create/history");
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* ヘッダー */}
			<header className="bg-white border-b-2 border-red-400 shadow-sm px-6 py-6">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
						ポケメモリア
					</h1>
					<p className="text-sm text-gray-600 mt-1">ポケモン履歴書作成ツール</p>
				</div>
			</header>

			{/* プログレスバー */}
			<div className="bg-white px-6 py-4">
				<div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-yellow-400 shadow-lg flex items-center justify-center text-red-600 font-bold">
							1
						</div>
						<span className="font-bold text-sm">原点</span>
					</div>
					<div className="w-32 h-1 bg-gray-300"></div>
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
							2
						</div>
						<span className="text-sm text-gray-600">軌跡</span>
					</div>
					<div className="w-32 h-1 bg-gray-300"></div>
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
							3
						</div>
						<span className="text-sm text-gray-600">相棒</span>
					</div>
					<div className="w-32 h-1 bg-gray-300"></div>
					<div className="flex items-center gap-2">
						<div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
							4
						</div>
						<span className="text-sm text-gray-600">完成</span>
					</div>
				</div>
			</div>

			{/* メインコンテンツ */}
			<main className="flex-1 px-4 py-8">
				<div className="max-w-5xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-normal mb-4">
							あなたの冒険はどこから始まりましたか？
						</h2>
						<p className="text-gray-600">
							最初に出会ったポケモンの世界を選択してください
						</p>
					</div>

					{/* 世代選択グリッド */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						{generations.map((gen) => (
							<button
								type="button"
								key={gen.id}
								onClick={() => setSelectedGeneration(gen.id)}
								className={`bg-white border-4 rounded-2xl p-7 hover:shadow-xl transition-all ${
									selectedGeneration === gen.id
										? "border-red-400 shadow-xl"
										: "border-gray-300"
								}`}
							>
								<div className="flex flex-col items-center gap-4">
									<div
										className={`w-16 h-16 rounded-full bg-gradient-to-br ${gen.color} shadow-lg`}
									></div>
									<div className="text-center">
										<h3 className="text-xl font-bold mb-1">{gen.name}</h3>
										<p className="text-sm text-gray-600">{gen.generation}</p>
										<p className="text-xs text-gray-500 mt-1">{gen.year}</p>
									</div>
								</div>
							</button>
						))}
					</div>
				</div>
			</main>

			{/* フッター */}
			<footer className="bg-white border-t-2 border-gray-300 shadow-lg px-6 py-6">
				<div className="max-w-5xl mx-auto flex items-center justify-between">
					<button
						type="button"
						className="px-6 py-3 bg-gray-200 rounded-xl flex items-center gap-2 text-gray-600 hover:bg-gray-300 transition-colors"
					>
						<ChevronLeft size={20} />
						<span>戻る</span>
					</button>
					<div className="text-center">
						<p className="text-sm text-gray-600">ステップ 1 / 4</p>
						<p className="text-xs text-red-500">必須項目を入力してください</p>
					</div>
					<button
						type="button"
						onClick={handleNext}
						disabled={!selectedGeneration}
						className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-opacity ${
							selectedGeneration
								? "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90"
								: "bg-gray-200 text-gray-400 cursor-not-allowed"
						}`}
					>
						<span>次へ</span>
						<ChevronRight size={20} />
					</button>
				</div>
			</footer>
		</div>
	);
}
