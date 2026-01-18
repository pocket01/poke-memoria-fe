import { cn } from "@/lib/utils";
import { StampIcon, type StampIconType } from "./stamp-icon";

type StampButtonProps = {
	type: StampIconType;
	isSelected?: boolean;
	onClick?: () => void;
	className?: string;
};

/**
 * スタンプボタンコンポーネント
 * ゲームカード内で表示されるスタンプ選択ボタン
 */
export function StampButton({
	type,
	isSelected = false,
	onClick,
	className,
}: StampButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"w-8 h-8 rounded flex items-center justify-center border border-gray-300 transition-all duration-200",
				"hover:border-gray-400 hover:bg-gray-50",
				isSelected && "border-gray-400 bg-gray-100",
				className,
			)}
			aria-label={`${type}スタンプ`}
		>
			<StampIcon
				type={type}
				size={16}
				className={cn(
					"transition-opacity",
					!isSelected && "opacity-40 hover:opacity-60",
				)}
			/>
		</button>
	);
}
