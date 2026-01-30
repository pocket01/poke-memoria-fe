import {
	StampIcon,
	type StampIconType,
	stampIconConfig,
} from "../atoms/stamp-icon";

type StampLegendProps = {
	className?: string;
};

const stampTypes: StampIconType[] = ["release", "later", "remake"];

/**
 * スタンプ凡例コンポーネント
 * 3つのスタンプタイプ（発売時・後から・リメイク）を横並びで表示
 */
export function StampLegend({ className }: StampLegendProps) {
	return (
		<div className={`flex justify-center gap-4 flex-wrap ${className || ""}`}>
			{stampTypes.map((type) => (
				<div
					key={type}
					className="flex items-center gap-2 px-4 py-2 bg-[#E3E8EE] rounded-full border-2 border-[#C9DAEB]"
				>
					<StampIcon type={type} />
					<span className="text-sm text-[#0A0A0A] font-medium">
						{stampIconConfig[type].label}
					</span>
				</div>
			))}
		</div>
	);
}
