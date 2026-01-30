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
				"p-7 pt-7 pb-1 rounded-2xl border-4 border-dashed border-[#C9DAEB] bg-[#E3E8EE] transition-all duration-300 hover:border-[#284CAC] text-left",
				className,
			)}
			onClick={onClick}
		>
			<div className="text-center py-8">
				<div className="flex justify-center mx-auto mb-3">
					<PokemonAvatar variant="empty" size="default" />
				</div>
				<p className="text-[#4A5565] text-base font-medium">
					スロット {slotNumber}
				</p>
				<p className="text-xs text-[#9CA3AF] mt-1">クリックして追加</p>
			</div>
		</button>
	);
}
