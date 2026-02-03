import { Search } from "lucide-react";
import { type PropsWithChildren, useEffect, useState } from "react";
import { getPokemonList } from "@/api/common";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
} from "../atoms/dialog";
import { PokemonAvatar } from "../atoms/pokemon-avatar";
import type { Pokemon } from "./Partners";

type Props = PropsWithChildren<{
	// open: boolean;
	// showDialog: () => void;
	// closeDialog: () => void;
}>;

/**
 * ポケモン選択ダイアログコンポーネント
 * @returns JSX.Element
 */
export function PokemonSelectDialog({
	// open,
	// showDialog,
	// closeDialog,
	children,
}: Props) {
	const [pokemons, setPokemons] = useState<string[]>([]);

	// 検索クエリの状態管理
	const [searchQuery, setSearchQuery] = useState("");
	const filteredPokemon = pokemons.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// ポケモンをチームに追加するハンドラー
	const handleAddPokemon = (slotIndex: number, pokemon: Pokemon) => {
		// setTeam((prev) => {
		// 	const newTeam = [...prev];
		// 	newTeam[slotIndex] = pokemon;
		// 	return newTeam;
		// });
		// closeDialog();
	};
	// ポケモン選択時のハンドラー
	const handleSelectPokemon = (name: string) => {
		// if (selectedSlot !== null) {
		// 	handleAddPokemon(selectedSlot, { name, type: "ノーマル" });
		// 	// setSelectedSlot(null);
		// 	setSearchQuery("");
		// }
		// closeDialog();
	};

	useEffect(() => {
		getPokemonList().then((data) => setPokemons(data));
	}, []);

	return (
		<Dialog>
			<DialogTrigger>{children}</DialogTrigger>
			<DialogPortal>
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
									className="cursor-pointer flex flex-col items-center bg-white gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-left"
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
			</DialogPortal>
		</Dialog>
	);
}
