import type { ReactNode } from "react";

type PageHeaderProps = {
	title: ReactNode;
	description?: ReactNode;
	className?: string;
};

/**
 * ページヘッダーコンポーネント。
 * ページのタイトルと説明文を表示する。
 * @param props.title メインタイトル
 * @param props.description サブタイトル・説明文
 * @param props.className 追加のクラス名
 * @returns JSX.Element
 */
export default function PageHeader({
	title,
	description,
	className = "",
}: PageHeaderProps) {
	return (
		<div className={`text-center ${className}`}>
			<h1 className="text-4xl font-normal mb-4 text-[#0A0A0A]">{title}</h1>
			{description && <p className="text-base text-[#4A5565]">{description}</p>}
		</div>
	);
}
