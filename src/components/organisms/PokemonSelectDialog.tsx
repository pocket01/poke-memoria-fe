"use client";
import { Search } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { parseAsBoolean, useQueryState } from "nuqs";
import { type PropsWithChildren, useMemo, useState } from "react";
import type { Pokemon, PokemonList } from "@/api/pokemon/type";
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
import { PokemonGridList } from "../molecules/PokemonGridList";

type Props = PropsWithChildren<{
	pokemons: PokemonList;
	to: Route;
	maxSelect?: number;
}>;

/**
 * ポケモン選択ダイアログコンポーネント
 * @param pokemons - ポケモン一覧
 * @param maxSelect - 最大選択数（デフォルト: 6）
 * @param children - トリガー要素
 * @returns JSX.Element
 */
export function PokemonSelectDialog({
	pokemons,
	to,
	maxSelect = 6,
	children,
}: Props) {
	const router = useRouter();

	// クエリパラメータからダイアログの表示状態を管理
	const [isDialogOpen, setIsDialogOpen] = useQueryState(
		"showPokemonDialog",
		parseAsBoolean.withDefault(false),
	);

	// 検索クエリの状態管理
	const [searchQuery, setSearchQuery] = useState("");

	// 選択状態
	const [selectedPokemons, setSelectedPokemons] = useState<number[]>([]);

	// 検索クエリに基づいてポケモンをフィルタリング
	const filteredPokemon = useMemo(
		() =>
			pokemons.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
			),
		[pokemons, searchQuery],
	);

	/**
	 * ポケモン選択状態を切り替える
	 * 選択時：ボールアニメーション＋番号表示
	 * 未選択時：アニメーション後にポケモン画像復表示
	 * 既選択ポケモンの番号をデクリメント
	 */
	const handlePokemonClick = async (pokemon: Pokemon) => {
		const isSelected = selectedPokemons.includes(pokemon.id);

		if (isSelected) {
			setSelectedPokemons((prev) => prev.filter((id) => id !== pokemon.id));
		} else if (selectedPokemons.length < maxSelect) {
			setSelectedPokemons((prev) => [...prev, pokemon.id]);
		}
	};

	const handleSubmit = () => {
		// 選択されたポケモンIDを処理するロジックをここに実装
		console.log("Selected Pokemon IDs:", selectedPokemons);
		router.push(`${to}?selected=${selectedPokemons.join(",")}`);
	};

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-6">
				<DialogHeader>
					<DialogTitle>相棒を選ぼう！</DialogTitle>
					<p className="text-sm text-gray-500 mt-2">
						最大{maxSelect}匹まで選択できます
					</p>
				</DialogHeader>

				{/* Selection counter */}
				<div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg w-fit">
					<span className="text-sm font-bold text-gray-700">
						{selectedPokemons.length}
					</span>
					<span className="text-sm text-gray-700">/</span>
					<span className="text-sm font-bold text-gray-700">{maxSelect}</span>
				</div>

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
				<PokemonGridList
					pokemons={filteredPokemon}
					selectedPokemonIds={selectedPokemons}
					onClickPokemon={handlePokemonClick}
				/>

				{/* {filteredPokemon.length === 0 && (
					<div className="text-center py-12 text-gray-400">
						<p>該当するポケモンが見つかりません</p>
					</div>
				)} */}

				<DialogFooter>
					<DialogClose asChild>
						<div className="flex gap-2">
							<Button onClick={handleSubmit}>決定</Button>
							<Button variant="outline">閉じる</Button>
						</div>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
