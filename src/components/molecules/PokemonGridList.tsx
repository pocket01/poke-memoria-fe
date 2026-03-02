import Image from "next/image";
import { useCallback } from "react";
import type { Pokemon, PokemonList } from "@/api/pokemon/type";
import { Badge } from "../atoms/badge";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "../atoms/card";

type Props = {
	pokemons: PokemonList;
	selectedPokemonIds?: number[];
	onClickPokemon?: (pokemon: Pokemon) => void;
};

/**
 * ポケモンをグリッド形式で表示するカードコンポーネント。
 * @param props.pokemons - 表示するポケモンのリスト
 * @param props.selectedPokemonIds - 選択されているポケモンのIDリスト
 * @param props.onClickPokemon - ポケモンカードクリック時のコールバック関数
 * @returns
 */
export function PokemonGridList({
	pokemons,
	selectedPokemonIds = [],
	onClickPokemon,
}: Props) {
	return (
		<div className="overflow-y-auto grid grid-cols-3 gap-3 p-3">
			{pokemons.map((pokemon) => (
				<PokemonGridItem
					key={`pokemon-${pokemon.id}`}
					pokemon={pokemon}
					selected={selectedPokemonIds.includes(pokemon.id)}
					selectedIndex={selectedPokemonIds.indexOf(pokemon.id) + 1}
					onClick={onClickPokemon}
				/>
			))}
		</div>
	);
}

/**
 * グリッド表示用のポケモンカードコンポーネント。
 * 選択状態に応じて、ポケモン画像とボール画像を切り替える。
 * @param props.pokemon - 表示するポケモンデータ
 * @param props.selected - 選択状態
 * @param props.selectedIndex - 選択された順序（1から連番）
 * @param props.onClick - カードクリック時のコールバック関数
 * @returns
 */
function PokemonGridItem({
	pokemon,
	selected,
	selectedIndex,
	onClick,
}: {
	pokemon: Pokemon;
	selected?: boolean;
	selectedIndex?: number;
	onClick?: (pokemon: Pokemon) => void;
}) {
	const handleClick = useCallback(() => {
		onClick?.(pokemon);
	}, [onClick, pokemon]);

	return (
		<Card
			key={`pokemon-${pokemon.id}`}
			className={`items-center bg-white cursor-pointer py-2 gap-2`}
			onClick={handleClick}
		>
			<CardHeader>
				<CardAction>
					<Badge hidden={!selectedIndex}>{selectedIndex}</Badge>
				</CardAction>
				<CardTitle className="text-base">{pokemon.name}</CardTitle>
			</CardHeader>
			<CardContent className="relative">
				<Image
					className={`absolute transition-all duration-300 ${selected ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
					src={pokemon.imageUrl}
					alt={pokemon.name}
					width={80}
					height={80}
				/>
				<Image
					className={`transition-all duration-300 ${selected ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
					src={"/pokeballs/02.svg"}
					alt={pokemon.name}
					width={80}
					height={80}
				/>
			</CardContent>
		</Card>
	);
}
