"use client";
import { Calendar, Tag, Trophy, User } from "lucide-react";

export type TrainerData = {
	name: string;
	startYear: string;
	totalGames: number;
	tags: string[];
	freeText: string;
};

type Props = {
	data: TrainerData;
	// onUpdateData: (data: Partial<TrainerData>) => void;
};

const availableTags = [
	"#対戦勢",
	"#色違い厳選",
	"#図鑑コンプ",
	"#考察勢",
	"#ストーリー重視",
	"#色違い所持",
	"#伝説ポケモン好き",
	"#御三家派",
	"#マイナーポケモン愛好家",
	"#ダブルバトル",
	"#シングルバトル",
	"#ポケモンGO",
	"#アニメファン",
	"#カードゲーム",
];

export function Profile({ data }: Props) {
	const toggleTag = (tag: string) => {
		const newTags = data.tags.includes(tag)
			? data.tags.filter((t) => t !== tag)
			: [...data.tags, tag];
	};

	return (
		<div className="w-full max-w-4xl mx-auto px-4 py-8">
			<div className="text-center mb-12">
				<h1 className="text-4xl mb-4">履歴書の仕上げ</h1>
				<p className="text-gray-600">あなた自身について教えてください</p>
			</div>

			<div className="space-y-8">
				{/* Trainer Name */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
					<div className="flex items-center gap-2 mb-3">
						<User className="w-5 h-5 text-red-500" />
						<span className="font-bold">トレーナー名</span>
						<span className="text-red-500 text-sm">*必須</span>
					</div>
					<input
						type="text"
						defaultValue={data.name}
						// onChange={(e) => onUpdateData({ name: e.target.value })}
						placeholder="例: サトシ"
						className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
					/>
				</div>

				{/* Start Year */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
					<div className="flex items-center gap-2 mb-3">
						<Calendar className="w-5 h-5 text-blue-500" />
						<span className="font-bold">旅を始めた年</span>
					</div>
					<input
						type="text"
						defaultValue={data.startYear}
						// onChange={(e) => onUpdateData({ startYear: e.target.value })}
						placeholder="例: 1996年"
						className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				{/* Total Games */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
					<div className="flex items-center gap-2 mb-3">
						<Trophy className="w-5 h-5 text-yellow-500" />
						<span className="font-bold">通算プレイ作品数</span>
					</div>
					<input
						type="number"
						defaultValue={data.totalGames || ""}
						// onChange={(e) =>
						// 	onUpdateData({ totalGames: parseInt(e.target.value) || 0 })
						// }
						placeholder="例: 15"
						className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
						min="0"
					/>
				</div>

				{/* Tags */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
					<div className="flex items-center gap-2 mb-4">
						<Tag className="w-5 h-5 text-purple-500" />
						<span className="font-bold">あなたのタグ</span>
						<span className="text-gray-500 text-sm">（複数選択可）</span>
					</div>
					<div className="flex flex-wrap gap-2">
						{availableTags.map((tag) => {
							const isSelected = data.tags.includes(tag);
							return (
								<button
									key={tag}
									type="button"
									onClick={() => toggleTag(tag)}
									className={`
                    px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                    ${
											isSelected
												? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
												: "bg-gray-100 text-gray-600 hover:bg-gray-200"
										}
                  `}
								>
									{tag}
								</button>
							);
						})}
					</div>
					{data.tags.length > 0 && (
						<div className="mt-4 p-3 bg-purple-50 rounded-lg">
							<p className="text-sm text-purple-700">
								{data.tags.length}個のタグを選択中
							</p>
						</div>
					)}
				</div>

				{/* Free Text */}
				<div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
					<div className="block mb-3">
						<span className="font-bold">自由記述</span>
						<span className="text-gray-500 text-sm ml-2">
							ポケモンへの思いや、その他の趣味などを自由に書いてください
						</span>
					</div>
					<textarea
						defaultValue={data.freeText}
						// onChange={(e) => onUpdateData({ freeText: e.target.value })}
						placeholder="例: ポケモンは幼少期からずっと大好きです。対戦では受けループを使うのが得意で、特にラッキーとハピナスの使い分けにこだわっています。最近はポケモンカードも始めました！"
						className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
						rows={6}
					/>
					<div className="mt-2 text-right text-sm text-gray-500">
						{data.freeText.length} 文字
					</div>
				</div>

				{/* Summary Card */}
				{data.name && (
					<div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-2xl">
						<h3 className="text-2xl font-bold mb-4">プレビュー</h3>
						<div className="space-y-2 bg-white/10 backdrop-blur rounded-xl p-4">
							<p className="text-xl font-bold">{data.name}</p>
							{data.startYear && <p>🗓️ {data.startYear}から冒険開始</p>}
							{data.totalGames > 0 && <p>🎮 {data.totalGames}作品プレイ済み</p>}
							{data.tags.length > 0 && (
								<div className="flex flex-wrap gap-2 mt-2">
									{data.tags.map((tag) => (
										<span
											key={tag}
											className="px-2 py-1 bg-white/20 rounded-full text-xs"
										>
											{tag}
										</span>
									))}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
