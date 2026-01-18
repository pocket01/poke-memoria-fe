import { EmptySlotCard } from "@/components/molecules/EmptySlotCard";
import { PokemonCard } from "@/components/molecules/PokemonCard";
import type { Pokemon } from "@/components/organisms/Partners";

export interface PokemonGridProps {
	team: (Pokemon | null)[];
	editingComment: number | null;
	onSlotClick?: (index: number) => void;
	onRemovePokemon?: (index: number) => void;
	onCommentClick?: (index: number) => void;
	onCommentChange?: (index: number, comment: string) => void;
	onCommentBlur?: () => void;
}

export function PokemonGrid({
	team,
	editingComment,
	onSlotClick,
	onRemovePokemon,
	onCommentClick,
	onCommentChange,
	onCommentBlur,
}: PokemonGridProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{team.map((pokemon, index) => {
				const key = `slot-${index}`;

				if (pokemon) {
					return (
						<PokemonCard
							key={key}
							name={pokemon.name}
							comment={pokemon.comment}
							isEditingComment={editingComment === index}
							onRemove={() => onRemovePokemon?.(index)}
							onCommentClick={() => onCommentClick?.(index)}
							onCommentChange={(comment) => onCommentChange?.(index, comment)}
							onCommentBlur={onCommentBlur}
						/>
					);
				}

				return (
					<EmptySlotCard
						key={key}
						slotNumber={index + 1}
						onClick={() => onSlotClick?.(index)}
					/>
				);
			})}
		</div>
	);
}
