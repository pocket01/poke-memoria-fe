"use client";
import { useState } from "react";
import { useWatch } from "react-hook-form";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { useModalStore } from "@/stores/modalStore";
import { EmptySlotCard } from "../molecules/EmptySlotCard";
import { PokemonCard } from "../molecules/PokemonCard";

export type Pokemon = {
	name: string;
	type: string;
	comment?: string;
};

function Partners() {
	const { openModal } = useModalStore();

	const handleParamChange = (slot: 1 | 2 | 3 | 4 | 5 | 6) => {
		openModal("pokemonSelect", { slot: slot });
	};

	const { control, setValue } = useGlobalForm();
	const { partners } = useWatch({ control });

	// モーダルを開くハンドラー
	const handleOpenModal = (index: number) => {
		if (index >= 0 && index <= 5)
			handleParamChange((index + 1) as 1 | 2 | 3 | 4 | 5 | 6);
	};

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
								<PokemonCard
									key={key}
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
							);
						}

						// 空のスロットの場合
						return (
							<EmptySlotCard
								key={key}
								slotNumber={index}
								onClick={() => handleOpenModal(index)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Partners;
