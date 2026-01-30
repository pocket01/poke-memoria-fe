import { cn } from "@/lib/utils";

type CounterProps = {
	count: number;
	label: string;
	className?: string;
};

/**
 * @todo コンポーネント不要化検討中
 */
/**
 * カウンター表示コンポーネント
 * 数値とラベルを青い背景のバッジで表示
 */
export function Counter({ count, label, className }: CounterProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center gap-2 px-4 py-3 bg-[#E3E8EE] rounded-full shadow-md border-2 border-[#E3E8EE]",
				className,
			)}
		>
			<span className="font-bold text-[#284CAC] text-lg leading-7">
				{count}
			</span>
			<span className="text-[#4A5565] text-base leading-6">{label}</span>
		</div>
	);
}
