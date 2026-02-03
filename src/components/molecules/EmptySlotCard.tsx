import { PokemonAvatar } from "@/components/atoms/pokemon-avatar";
import { cn } from "@/lib/utils";
import { Card } from "../atoms/card";

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
		<Card
			className={cn(
				"cursor-pointer p-7 pt-7 pb-1 transition-all duration-300 text-left",
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
		</Card>
	);
}
