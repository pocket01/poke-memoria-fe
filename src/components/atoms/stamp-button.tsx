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
				"neu-flat w-8 h-8 rounded flex items-center justify-center border border-[#C9DAEB] transition-all duration-200",
				"hover:border-[#284CAC] hover:bg-[#E3E8EE]",
				isSelected && "border-[#284CAC] bg-[#E3E8EE]",
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
