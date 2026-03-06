import Image from "next/image";
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
			<div className="flex flex-col items-center py-8">
				<Image
					src="/pokeballs/01.svg"
					alt={`${slotNumber + 1}匹目`}
					width={128}
					height={128}
				/>
				<p className="text-[#4A5565] text-base font-medium">
					{slotNumber + 1}匹目
				</p>
				<p className="text-xs text-[#9CA3AF] mt-1">相棒を選ぶ</p>
			</div>
		</Card>
	);
}
