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
	availableTags: string[];
	// onUpdateData: (data: Partial<TrainerData>) => void;
};

function Profile({ data, availableTags }: Props) {
	const toggleTag = (tag: string) => {
		const newTags = data.tags.includes(tag)
			? data.tags.filter((t) => t !== tag)
			: [...data.tags, tag];
		return newTags;
	};

	return (
		<main className="w-full flex-1 flex flex-col px-6 py-8">
			<div className="max-w-6xl mx-auto w-full flex-1">
				<div className="text-center mb-12">
					<h1 className="text-4xl mb-4 font-normal text-[#0A0A0A]">
						履歴書の仕上げ
					</h1>
					<p className="text-sm text-[#4A5565]">
						あなた自身について教えてください
					</p>
				</div>

				<div className="space-y-8">
					{/* Trainer Name */}
					<div className="bg-[#E3E8EE] rounded-2xl p-6 shadow-md border-2 border-[#E3E8EE]">
						<div className="flex items-center gap-2 mb-3">
							<User className="w-5 h-5 text-[#284CAC]" />
							<span className="font-bold text-[#0A0A0A]">トレーナー名</span>
							<span className="text-[#EF4444] text-sm">*必須</span>
						</div>
						<input
							type="text"
							defaultValue={data.name}
							// onChange={(e) => onUpdateData({ name: e.target.value })}
							placeholder="例: サトシ"
							className="w-full px-4 py-3 border-2 border-[#C9DAEB] rounded-2xl bg-[#E3E8EE] focus:outline-none focus:ring-2 focus:ring-[#284CAC] focus:border-transparent text-[#0A0A0A]"
						/>
					</div>

					{/* Start Year */}
					<div className="bg-[#E3E8EE] rounded-2xl p-6 shadow-md border-2 border-[#E3E8EE]">
						<div className="flex items-center gap-2 mb-3">
							<Calendar className="w-5 h-5 text-[#284CAC]" />
							<span className="font-bold text-[#0A0A0A]">旅を始めた年</span>
						</div>
						<input
							type="text"
							defaultValue={data.startYear}
							// onChange={(e) => onUpdateData({ startYear: e.target.value })}
							placeholder="例: 1996年"
							className="w-full px-4 py-3 border-2 border-[#C9DAEB] rounded-2xl bg-[#E3E8EE] focus:outline-none focus:ring-2 focus:ring-[#284CAC] focus:border-transparent text-[#0A0A0A]"
						/>
					</div>

					{/* Total Games */}
					<div className="bg-[#E3E8EE] rounded-2xl p-6 shadow-md border-2 border-[#E3E8EE]">
						<div className="flex items-center gap-2 mb-3">
							<Trophy className="w-5 h-5 text-[#284CAC]" />
							<span className="font-bold text-[#0A0A0A]">通算プレイ作品数</span>
						</div>
						<input
							type="number"
							defaultValue={data.totalGames || ""}
							// onChange={(e) =>
							// 	onUpdateData({ totalGames: parseInt(e.target.value) || 0 })
							// }
							placeholder="例: 15"
							className="w-full px-4 py-3 border-2 border-[#C9DAEB] rounded-2xl bg-[#E3E8EE] focus:outline-none focus:ring-2 focus:ring-[#284CAC] focus:border-transparent text-[#0A0A0A]"
							min="0"
						/>
					</div>

					{/* Tags */}
					<div className="bg-[#E3E8EE] rounded-2xl p-6 shadow-md border-2 border-[#E3E8EE]">
						<div className="flex items-center gap-2 mb-4">
							<Tag className="w-5 h-5 text-[#284CAC]" />
							<span className="font-bold text-[#0A0A0A]">あなたのタグ</span>
							<span className="text-[#6A7282] text-sm">（複数選択可）</span>
						</div>
						<div className="flex flex-wrap gap-3">
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
												? "bg-[#284CAC] text-white shadow-lg"
												: "bg-[#E3E8EE] text-[#4A5565] hover:bg-[#D4DDE6] border border-[#C9DAEB]"
										}
                  `}
									>
										{tag}
									</button>
								);
							})}
						</div>
						{data.tags.length > 0 && (
							<div className="mt-4 p-3 bg-[#D4DDE6] rounded-lg">
								<p className="text-sm text-[#284CAC]"></p>
							</div>
						)}
					</div>

					{/* Free Text */}
					<div className="bg-[#E3E8EE] rounded-2xl p-6 shadow-md border-2 border-[#E3E8EE]">
						<div className="block mb-3">
							<span className="font-bold text-[#0A0A0A]">自由記述</span>
							<span className="text-[#6A7282] text-sm ml-2">
								ポケモンへの思いや、その他の趣味などを自由に書いてください
							</span>
						</div>
						<textarea
							defaultValue={data.freeText}
							// onChange={(e) => onUpdateData({ freeText: e.target.value })}
							placeholder="例: ポケモンは幼少期からずっと大好きです。対戦では受けループを使うのが得意で、特にラッキーとハピナスの使い分けにこだわっています。最近はポケモンカードも始めました！"
							className="w-full px-4 py-3 border-2 border-[#C9DAEB] rounded-2xl bg-[#E3E8EE] focus:outline-none focus:ring-2 focus:ring-[#284CAC] focus:border-transparent resize-none text-[#0A0A0A]"
							rows={6}
						/>
						<div className="mt-2 text-right text-sm text-[#6A7282]">
							{data.freeText.length} 文字
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Profile;
