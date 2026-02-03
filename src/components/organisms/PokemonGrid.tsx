import { EmptySlotCard } from "@/components/molecules/EmptySlotCard";
import { PokemonCard } from "@/components/molecules/PokemonCard";
import { PokemonSelectDialog } from "./PokemonSelectDialog";

type Partner = {
	pokemonId?: number | null;
	comment?: string;
};

type PokemonGridProps = {
	partners?: Partner[];
	editingComment: number | null;
	onSlotClick?: (index: number) => void;
	onRemovePokemon?: (index: number) => void;
	onCommentClick?: (index: number) => void;
	onCommentChange?: (index: number, comment: string) => void;
	onCommentBlur?: () => void;
};

export function PokemonGrid({
	partners,
	editingComment,
	onSlotClick,
	onRemovePokemon,
	onCommentClick,
	onCommentChange,
	onCommentBlur,
}: PokemonGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{partners?.map((pokemon, index) => {
				const key = `slot-${index}`;

				return (
					<PokemonSelectDialog key={key}>
						{pokemon && (
							<PokemonCard
								name={""}
								comment={pokemon.comment}
								isEditingComment={editingComment === index}
								onRemove={() => onRemovePokemon?.(index)}
								onCommentClick={() => onCommentClick?.(index)}
								onCommentChange={(comment) => onCommentChange?.(index, comment)}
								onCommentBlur={onCommentBlur}
							/>
						)}
						{!pokemon && (
							<EmptySlotCard
								slotNumber={index + 1}
								onClick={() => onSlotClick?.(index)}
							/>
						)}
					</PokemonSelectDialog>
				);
			})}
		</div>
	);
}
