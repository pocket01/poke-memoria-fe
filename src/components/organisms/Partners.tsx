"use client";
import { type PropsWithChildren, useState } from "react";
import { useWatch } from "react-hook-form";
import { PokemonGrid } from "@/components/organisms/PokemonGrid";
import { useGlobalForm } from "@/context/GlobalFormProvider";

export type Pokemon = {
	name: string;
	type: string;
	comment?: string;
};

type Props = PropsWithChildren<{}>;

function Partners({ children }: Props) {
	const { control, setValue } = useGlobalForm();
	const { partners } = useWatch({ control });
	// 選択中のスロット管理
	const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

	// モーダルを開くハンドラー
	const handleOpenModal = (index: number) => {
		setSelectedSlot(index);
	};

	// コメント編集中のスロット管理
	const [editingComment, setEditingComment] = useState<number | null>(null);

	// ポケモンをチームから削除するハンドラー
	const handleRemovePokemon = (slotIndex: number) => {
		setValue(`partners.${slotIndex}`, { pokemonId: null, comment: "" });
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
				<PokemonGrid
					partners={partners}
					editingComment={editingComment}
					onSlotClick={(index) => handleOpenModal(index)}
					onRemovePokemon={handleRemovePokemon}
					onCommentClick={handleCommentClick}
					onCommentChange={handleCommentChange}
					onCommentBlur={handleCommentBlur}
				/>
			</div>
		</div>
	);
}

export default Partners;
