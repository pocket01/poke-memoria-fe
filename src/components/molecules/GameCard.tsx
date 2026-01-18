import { StampButton } from "../atoms/stamp-button";
import type { StampIconType } from "../atoms/stamp-icon";
import { StampIcon, stampIconConfig } from "../atoms/stamp-icon";

type GameCardProps = {
	title: string;
	region: string;
	selectedStamp?: StampIconType;
	onStampClick?: (type: StampIconType) => void;
	className?: string;
};

const stampTypes: StampIconType[] = ["release", "later", "remake"];

/**
 * ゲームカードコンポーネント
 * ポケモン作品の情報とスタンプ選択ボタンを表示
 */
export function GameCard({
	title,
	region,
	selectedStamp,
	onStampClick,
	className,
}: GameCardProps) {
	const getBorderColor = () => {
		if (!selectedStamp) return "border-gray-300";
		const colors = {
			release: "border-red-400",
			later: "border-blue-400",
			remake: "border-purple-400",
		};
		return colors[selectedStamp];
	};

	return (
		<div
			className={`p-5 rounded-2xl border-4 transition-all duration-300 bg-white shadow-md ${getBorderColor()} ${className || ""}`}
		>
			<div className="flex items-start justify-between gap-4">
				<div className="flex-1">
					<h3 className="text-lg font-bold text-black mb-1">{title}</h3>
					<p className="text-sm text-gray-600">{region}地方</p>
				</div>

				{/* Stamp buttons */}
				<div className="flex gap-2">
					{stampTypes.map((type) => (
						<StampButton
							key={type}
							type={type}
							isSelected={selectedStamp === type}
							onClick={() => onStampClick?.(type)}
						/>
					))}
				</div>
			</div>

			{/* Selected stamp display */}
			{selectedStamp && (
				<div className="mt-3 pt-3 border-t border-gray-200">
					<div
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-opacity-10"
						style={{
							backgroundColor: `${stampIconConfig[selectedStamp].color}20`,
						}}
					>
						<StampIcon type={selectedStamp} size={16} />
						<span
							className="text-xs font-normal"
							style={{ color: stampIconConfig[selectedStamp].color }}
						>
							{stampIconConfig[selectedStamp].label}でプレイ
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
