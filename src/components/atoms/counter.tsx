import { cn } from "@/lib/utils";

type CounterProps = {
	count: number;
	label: string;
	className?: string;
};

/**
 * カウンター表示コンポーネント
 * 数値とラベルを青い背景のバッジで表示
 */
export function Counter({ count, label, className }: CounterProps) {
	return (
		<div
			className={cn(
				"inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full",
				className,
			)}
		>
			<span className="font-bold text-blue-600 text-xl leading-7">{count}</span>
			<span className="text-gray-600 text-base leading-6">{label}</span>
		</div>
	);
}
