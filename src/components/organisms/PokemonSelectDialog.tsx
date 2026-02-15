"use client";
import { Search } from "lucide-react";
import { type PropsWithChildren, useState } from "react";
import { Button } from "../atoms/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../atoms/dialog";
import { PokemonAvatar } from "../atoms/pokemon-avatar";

type Props = PropsWithChildren<{
	pokemons: string[];
}>;

/**
 * ポケモン選択ダイアログコンポーネント
 * @returns JSX.Element
 */
export function PokemonSelectDialog({ pokemons, children }: Props) {
	// 検索クエリの状態管理
	const [searchQuery, setSearchQuery] = useState("");
	const filteredPokemon = pokemons.filter((name) =>
		name.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// ポケモンをチームに追加するハンドラー
	const handleAddPokemon = () => {
		// /** @todo 一旦仮 */
		// if (type === "pokemonSelect")
		// 	setValue(`partners.${type.slot - 1}`, { pokemonId: 1, comment: "" });
		// submitModal?.();
	};
	// ポケモン選択時のハンドラー
	const handleSelectPokemon = (name: string) => {
		/** @todo 一旦仮 */
		console.log(name);
		handleAddPokemon();
		// closeModal();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
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
				<DialogFooter>
					<DialogClose asChild>
						<div className="flex gap-2">
							<Button>決定</Button>
							<Button variant="outline">閉じる</Button>
						</div>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
