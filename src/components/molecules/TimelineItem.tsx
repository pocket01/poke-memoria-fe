import { Card, CardDescription, CardTitle } from "../atoms/card";

type Props = {
	/** タイトル */
	title: string;
	/** 地域 */
	region: string;
	/** 追加のクラス名 */
	className?: string;
	/** 選択状態 */
	selected?: boolean;
	/** カードがクリックされたときのハンドラー */
	onClickCard?: () => void;
};

/**
 * タイムラインアイテムコンポーネント
 * 年号バッジとゲームカードのセット
 * @param props Props
 * @returns JSX.Element
 */
export function TimelineItem({
	title,
	region,
	className,
	selected = false,
	onClickCard,
}: Props) {
	return (
		<div className={`relative pl-8 ${className || ""}`}>
			<Card
				onClick={onClickCard}
				className={`text-center min-w-64 p-4 hover:scale-105 hover:neu-hover ${
					selected ? "neu-pressed" : "neu-flat"
				}`}
			>
				<CardTitle className="text-center">{title}</CardTitle>
				<CardDescription>{region}地方</CardDescription>

				{/* Selected stamp display */}
				{/* {selectedStamp && (
					<div className="mt-3 pt-3 border-t border-[#C9DAEB]">
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
				)} */}
			</Card>
		</div>
	);
}
