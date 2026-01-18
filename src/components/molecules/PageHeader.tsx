import type { ReactNode } from "react";
import { Counter } from "../atoms/counter";

type PageHeaderProps = {
	title: ReactNode;
	description?: ReactNode;
	playedCount?: number;
	countLabel?: string;
	className?: string;
};

/**
 * ページヘッダーコンポーネント。
 * ページのタイトル、説明文、カウンター表示を含む
 * @param props.title メインタイトル
 * @param props.description サブタイトル・説明文
 * @param props.playedCount プレイ済み作品数（指定時にCounterを表示）
 * @param props.countLabel カウンターのラベル
 * @param props.className 追加のクラス名
 * @returns JSX.Element
 */
export default function PageHeader({
	title,
	description,
	playedCount,
	countLabel = "作品プレイ済み",
	className = "",
}: PageHeaderProps) {
	return (
		<div className={`text-center ${className}`}>
			<h1 className="text-4xl font-normal mb-4 text-[#0A0A0A]">{title}</h1>
			{description && <p className="text-base text-[#4A5565]">{description}</p>}
			{playedCount !== undefined && (
				<Counter count={playedCount} label={countLabel} className="mt-4" />
			)}
		</div>
	);
}
