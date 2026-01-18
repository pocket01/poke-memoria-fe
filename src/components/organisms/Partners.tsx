"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/atoms/dialog";
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
	defaultTeam: (Pokemon | null)[];
};

function Partners({ popularPokemon, defaultTeam }: Props) {
	// 選択中のスロット管理
	const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

	// チームの状態管理
	const [team, setTeam] = useState<(Pokemon | null)[]>(defaultTeam);

	// コメント編集中のスロット管理
	const [editingComment, setEditingComment] = useState<number | null>(null);

	// 検索クエリの状態管理
	const [searchQuery, setSearchQuery] = useState("");
	const filteredPokemon = popularPokemon.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// モーダルを開くハンドラー
	const handleOpenModal = (index: number) => {
		setSelectedSlot(index);
	};

	// モーダルを閉じるハンドラー
	const handleCloseModal = () => {
		setSelectedSlot(null);
		setSearchQuery("");
	};

	// ポケモンをチームに追加するハンドラー
	const handleAddPokemon = (slotIndex: number, pokemon: Pokemon) => {
		setTeam((prev) => {
			const newTeam = [...prev];
			newTeam[slotIndex] = pokemon;
			return newTeam;
		});
		handleCloseModal();
	};

	// ポケモンをチームから削除するハンドラー
	const handleRemovePokemon = (slotIndex: number) => {
		setTeam((prev) => {
			const newTeam = [...prev];
			newTeam[slotIndex] = null;
			return newTeam;
		});
	};

	// コメント編集のハンドラー
	const handleCommentClick = (index: number) => {
		setEditingComment(index);
	};

	const handleCommentChange = (slotIndex: number, comment: string) => {
		setTeam((prev) => {
			const newTeam = [...prev];
			const pokemon = newTeam[slotIndex];
			if (pokemon) {
				newTeam[slotIndex] = { ...pokemon, comment };
			}
			return newTeam;
		});
	};

	const handleCommentBlur = () => {
		setEditingComment(null);
	};

	// ポケモン選択時のハンドラー
	const handleSelectPokemon = (name: string) => {
		if (selectedSlot !== null) {
			handleAddPokemon(selectedSlot, { name, type: "ノーマル" });
			// setSelectedSlot(null);
			setSearchQuery("");
		}
	};

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
					onSlotClick={(index) => handleOpenModal(index)}
					onRemovePokemon={handleRemovePokemon}
					onCommentClick={handleCommentClick}
					onCommentChange={handleCommentChange}
					onCommentBlur={handleCommentBlur}
				/>
			</div>

			{/* Pokemon Selection Dialog */}
			<Dialog
				open={selectedSlot !== null}
				onOpenChange={(open) => !open && handleCloseModal()}
			>
				<DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-6">
					<DialogHeader>
						<DialogTitle>ポケモンを選択</DialogTitle>
					</DialogHeader>

					{/* Search input */}
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
									onClick={() => handleSelectPokemon(name)}
									className="flex flex-col items-center bg-white gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-left"
								>
									<PokemonAvatar variant="filled" size="sm" />
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
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default Partners;
