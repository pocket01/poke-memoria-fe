"use client";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import type { PokemonList } from "@/api/pokemon/type";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { EmptySlotCard } from "../molecules/EmptySlotCard";
import { PokemonCard } from "../molecules/PokemonCard";

type Props = {
	pokemons: PokemonList;
	selectedPokemons?: number[];
};

function Partners({ pokemons, selectedPokemons }: Props) {
	const { control, setValue } = useGlobalForm();

	// クエリパラメータからダイアログの表示状態を管理
	const [isDialogOpen, setIsDialogOpen] = useQueryState(
		"showPokemonDialog",
		parseAsBoolean.withDefault(false),
	);
	const { partners } = useWatch({ control });
	// クエリパラメータから選択されたポケモンのIDを取得
	const queryPartners =
		selectedPokemons?.map((id) => ({ pokemonId: id, comment: "" })) ?? [];
	// フォームの状態とクエリパラメータの状態をマージしたパートナーデータ
	const myPartners = partners?.map((partner, index) => {
		if (partner?.pokemonId) {
			// フォームの状態が優先される
			return partner;
		} else if (queryPartners[index]) {
			// クエリパラメータの状態を反映
			return queryPartners[index];
		} else {
			// どちらにもない場合は空のスロット
			return null;
		}
	});

	const openPokemonDialog = useCallback(() => {
		setIsDialogOpen(true);
	}, [setIsDialogOpen]);

	// コメント編集中のスロット管理
	const [editingComment, setEditingComment] = useState<number | null>(null);

	// ポケモンをチームから削除するハンドラー
	const handleRemovePokemon = (slotIndex: number) => {
		setValue(`partners.${slotIndex}`, null);
	};

	// コメント編集のハンドラー
	const handleCommentClick = (index: number) => {
		setEditingComment(index);
	};

	const handleCommentChange = (slotIndex: number, comment: string) => {
		setValue(`partners.${slotIndex}.comment`, comment);
	};

	const handleCommentBlur = () => {
		setEditingComment(null);
	};

	return (
		<div className="max-w-6xl mx-auto w-full flex-1">
			<div className="mb-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{myPartners?.map((pokemon, index) => {
						const key = `slot-${index}`;

						// ポケモンが選択されている場合
						if (pokemon) {
							return (
								<PokemonCard
									name={
										pokemons.find((p) => p.id === pokemon.pokemonId)?.name || ""
									}
									comment={pokemon.comment}
									isEditingComment={editingComment === index}
									onRemove={() => handleRemovePokemon(index)}
									onCommentClick={() => handleCommentClick(index)}
									onCommentChange={(comment) =>
										handleCommentChange(index, comment)
									}
									onCommentBlur={handleCommentBlur}
								/>
							);
						}

						// 空のスロットの場合
						return (
							<div key={key}>
								<EmptySlotCard slotNumber={index} onClick={openPokemonDialog} />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Partners;
