import { Badge } from "../atoms/badge";
import type { StampIconType } from "../atoms/stamp-icon";
import { GameCard } from "./GameCard";

type TimelineItemProps = {
	year: number;
	title: string;
	region: string;
	selectedStamp?: StampIconType;
	onStampClick?: (type: StampIconType) => void;
	className?: string;
};

/**
 * タイムラインアイテムコンポーネント
 * 年号バッジとゲームカードのセット
 */
export function TimelineItem({
	year,
	title,
	region,
	selectedStamp,
	onStampClick,
	className,
}: TimelineItemProps) {
	return (
		<div className={`relative pl-20 ${className || ""}`}>
			{/* Year marker */}
			<div className="absolute left-0 top-0 w-16 text-center">
				<Badge variant="year" className="mx-auto">
					{year}
				</Badge>
			</div>
			{/* Game card */}
			<GameCard
				title={title}
				region={region}
				selectedStamp={selectedStamp}
				onStampClick={onStampClick}
			/>
		</div>
	);
}
