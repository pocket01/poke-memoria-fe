"use client";
import { Circle, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../atoms/button";

export type Pokemon = {
	name: string;
	type: string;
	comment?: string;
};

type Props = {
	popularPokemon: string[];
	team: (Pokemon | null)[];
	// onAddPokemon: (slotIndex: number, pokemon: Pokemon) => void;
	// onRemovePokemon: (slotIndex: number) => void;
	// onUpdateComment: (slotIndex: number, comment: string) => void;
};

export function Partners({
	popularPokemon,
	team,
	// onAddPokemon,
	// onRemovePokemon,
	// onUpdateComment,
}: Props) {
	const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [editingComment, setEditingComment] = useState<number | null>(null);

	const filteredPokemon = popularPokemon.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const handleSelectPokemon = (name: string) => {
		if (selectedSlot !== null) {
			// onAddPokemon(selectedSlot, { name, type: "ノーマル" });
			setSelectedSlot(null);
			setSearchQuery("");
		}
	};

	const filledCount = team.filter((p) => p !== null).length;

	return (
		<div className="w-full max-w-5xl mx-auto px-4 py-8">
			<div className="text-center mb-12">
				<h1 className="text-4xl mb-4">手持ちの6匹</h1>
				<p className="text-gray-600">あなたの最高の相棒たちを選んでください</p>
				<div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
					<span className="font-bold text-green-600 text-xl">
						{filledCount}
					</span>
					<span className="text-gray-600">/ 6匹</span>
				</div>
			</div>

			{/* Team Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{team.map((pokemon, index) => (
					<div
						key={`partners-${index.toString()}`}
						// whileHover={{ scale: pokemon ? 1.02 : 1.05 }}
						className={
							"relative p-6 rounded-2xl border-4 transition-all duration-300 cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 border-dashed border-gray-300 hover:border-red-300"
						}
						// onClick={() => {
						// 	if (!pokemon) {
						// 		setSelectedSlot(index);
						// 	}
						// }}
					>
						{pokemon ? (
							<>
								{/* Remove button */}
								<Button className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
									<X className="w-4 h-4" />
								</Button>

								{/* Pokemon display */}
								<div className="text-center mb-4">
									<div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
										<Circle className="w-10 h-10 text-white fill-current" />
									</div>
									<h3 className="font-bold text-xl">{pokemon.name}</h3>
								</div>

								{/* Comment section */}
								<div className="mt-4">
									{editingComment === index ? (
										<textarea
											value={pokemon.comment || ""}
											// onChange={(e) => onUpdateComment(index, e.target.value)}
											onBlur={() => setEditingComment(null)}
											placeholder="思い出を書く..."
											className="w-full p-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
											rows={3}
											onClick={(e) => e.stopPropagation()}
										/>
									) : (
										<div className="min-h-[60px] p-2 text-sm text-gray-600 bg-gray-50 rounded-lg cursor-text hover:bg-gray-100 transition-colors">
											{pokemon.comment || "思い出を記入..."}
										</div>
									)}
								</div>
							</>
						) : (
							<div className="text-center py-8">
								<div className="w-20 h-20 mx-auto mb-3 border-4 border-dashed border-gray-300 rounded-full flex items-center justify-center">
									<Circle className="w-10 h-10 text-gray-300" />
								</div>
								<p className="text-gray-400">スロット {index + 1}</p>
								<p className="text-xs text-gray-400 mt-1">クリックして追加</p>
							</div>
						)}
					</div>
				))}
			</div>

			{/* Pokemon Selection Modal */}
			{selectedSlot !== null && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-2xl font-bold">ポケモンを選択</h2>
							<button
								type="button"
								className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						</div>

						{/* Search bar */}
						<div className="relative mb-4">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="ポケモン名で検索..."
								className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
							/>
						</div>

						{/* Pokemon list */}
						<div className="flex-1 overflow-y-auto">
							<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
								{filteredPokemon.map((name) => (
									<button
										key={name}
										type="button"
										className="p-4 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-center"
									>
										<div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center">
											<Circle className="w-6 h-6 text-white fill-current" />
										</div>
										<p className="font-medium text-sm">{name}</p>
									</button>
								))}
							</div>

							{filteredPokemon.length === 0 && (
								<div className="text-center py-12 text-gray-400">
									<p>該当するポケモンが見つかりません</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
