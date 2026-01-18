"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { PokemonAvatar } from "@/components/atoms/pokemon-avatar";
import PageHeader from "@/components/molecules/PageHeader";
import { PokemonGrid } from "@/components/organisms/PokemonGrid";

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

function Partners({
	popularPokemon,
	team,
	// onAddPokemon,
	// onRemovePokemon,
	// onUpdateComment,
}: Props) {
	const [selectedSlot] = useState<number | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [editingComment, setEditingComment] = useState<number | null>(null);

	const filteredPokemon = popularPokemon.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// const handleSelectPokemon = (name: string) => {
	// 	if (selectedSlot !== null) {
	// 		// onAddPokemon(selectedSlot, { name, type: "ノーマル" });
	// 		setSelectedSlot(null);
	// 		setSearchQuery("");
	// 	}
	// };

	const filledCount = team.filter((p) => p !== null).length;

	return (
		<div className="w-full max-w-5xl mx-auto px-4 py-8">
			<PageHeader
				title="手持ちの6匹"
				description="あなたの最高の相棒たちを選んでください"
				playedCount={filledCount}
				countLabel="/ 6匹"
			/>

			<div className="mb-8">
				<PokemonGrid
					team={team}
					editingComment={editingComment}
					// onSlotClick={(index) => setSelectedSlot(index)}
					// onRemovePokemon={onRemovePokemon}
					onCommentClick={(index) => setEditingComment(index)}
					// onCommentChange={onUpdateComment}
					onCommentBlur={() => setEditingComment(null)}
				/>
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
										<div className="mx-auto mb-2">
											<PokemonAvatar variant="filled" size="sm" />
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

export default Partners;
