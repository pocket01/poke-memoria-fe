"use client";
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsInteger,
	useQueryState,
} from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import type { PokemonList } from "@/api/pokemon/type";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { useMemoriesStore } from "@/stores/memoriesStore";
import { EmptySlotCard } from "../molecules/EmptySlotCard";
import { PokemonCard } from "../molecules/PokemonCard";

type Props = {
	pokemons: PokemonList;
};

function Partners({ pokemons }: Props) {
	const { memories } = useMemoriesStore();
	const { control, setValue } = useGlobalForm();

	// クエリパラメータ：ダイアログの表示状態
	const [_, setQueryDialogOpen] = useQueryState(
		"showPokemonDialog",
		parseAsBoolean.withDefault(false),
	);
	// クエリパラメータ：選択ポケモンのID一覧
	const [querySelectedPokemons, setQuerySelectedPokemons] = useQueryState(
		"selectedPokemons",
		{
			...parseAsArrayOf(parseAsInteger).withDefault(
				memories.partners.filter((p) => p !== null).map((p) => p.pokemonId),
			),
			clearOnDefault: false,
		},
	);
	const queryPartners =
		querySelectedPokemons?.map((id) => ({ pokemonId: id, comment: "" })) ?? [];

	const { partners } = useWatch({ control });

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
		// クエリパラメータに選択ポケモンIDがない場合、メモリーズのパートナーデータをデフォルトとしてセットする
		setQuerySelectedPokemons((prev) => prev);
		setQueryDialogOpen(true);
	}, [setQuerySelectedPokemons, setQueryDialogOpen]);

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

	useEffect(() => {
		if (querySelectedPokemons.length) {
			// クエリパラメータの選択ポケモンIDをフォームの状態に反映
			querySelectedPokemons.forEach((id, index) => {
				setValue(`partners.${index}`, { pokemonId: id, comment: "" });
			});
		} else {
			setValue("partners", [null, null, null, null, null, null]);
		}
	}, [querySelectedPokemons, setValue]);

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
									key={key}
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
