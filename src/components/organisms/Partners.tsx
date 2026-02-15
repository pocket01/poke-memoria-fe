"use client";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { EmptySlotCard } from "../molecules/EmptySlotCard";
import { PokemonCard } from "../molecules/PokemonCard";
import { PokemonSelectDialog } from "./PokemonSelectDialog";

export type Pokemon = {
	name: string;
	type: string;
	comment?: string;
};

type Props = {
	pokemons: string[];
};

function Partners({ pokemons }: Props) {
	const { control, setValue } = useGlobalForm();
	const { partners } = useWatch({ control });

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
					{partners?.map((pokemon, index) => {
						const key = `slot-${index}`;

						// ポケモンが選択されている場合
						if (pokemon) {
							return (
								<PokemonSelectDialog pokemons={pokemons} key={key}>
									<PokemonCard
										name={pokemon.pokemonId?.toString() ?? ""}
										comment={pokemon.comment}
										isEditingComment={editingComment === index}
										onRemove={() => handleRemovePokemon(index)}
										onCommentClick={() => handleCommentClick(index)}
										onCommentChange={(comment) =>
											handleCommentChange(index, comment)
										}
										onCommentBlur={handleCommentBlur}
									/>
								</PokemonSelectDialog>
							);
						}

						// 空のスロットの場合
						return (
							<div key={key}>
								<PokemonSelectDialog pokemons={pokemons} key={key}>
									<EmptySlotCard slotNumber={index} />
								</PokemonSelectDialog>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Partners;
