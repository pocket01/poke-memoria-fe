import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface RemoveButtonProps {
	onClick?: () => void;
	className?: string;
}

export function RemoveButton({ onClick, className }: RemoveButtonProps) {
	return (
		<button
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				onClick?.();
			}}
			className={cn(
				"w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg",
				className,
			)}
		>
			<X className="w-4 h-4" />
		</button>
	);
}
