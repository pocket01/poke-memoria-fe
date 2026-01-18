import { PokemonAvatar } from "@/components/atoms/pokemon-avatar";
import { cn } from "@/lib/utils";

export interface EmptySlotCardProps {
	slotNumber: number;
	onClick?: () => void;
	className?: string;
}

export function EmptySlotCard({
	slotNumber,
	onClick,
	className,
}: EmptySlotCardProps) {
	return (
		<button
			type="button"
			className={cn(
				"p-7 pt-7 pb-1 rounded-2xl border-4 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-300 hover:border-red-300 text-left",
				className,
			)}
			onClick={onClick}
		>
			<div className="text-center py-8">
				<div className="mx-auto mb-3">
					<PokemonAvatar variant="empty" size="default" />
				</div>
				<p className="text-gray-400 text-base">スロット {slotNumber}</p>
				<p className="text-xs text-gray-400 mt-1">クリックして追加</p>
			</div>
		</button>
	);
}
