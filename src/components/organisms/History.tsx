"use client";
import { useWatch } from "react-hook-form";
import { useGlobalForm } from "@/context/GlobalFormProvider";
import { Badge } from "../atoms/badge";
import { TimelineItem } from "../molecules/TimelineItem";

/**
 * ゲームリリースデータ型
 */
export type GameRelease = {
	year: number;
	generation: number;
	titles: GameTitle[];
};

/**
 * ゲームタイトルデータ型
 */
export type GameTitle = {
	id: string;
	name: string;
	region: string;
};

type Props = {
	titles: GameRelease[];
};

function History({ titles }: Props) {
	// グローバルフォームの状態を取得
	const { setValue, control } = useGlobalForm();
	const selectedHistory =
		useWatch({
			control,
			name: "history",
			defaultValue: [],
		}) ?? [];

	// タイトル選択時のハンドラー
	const onSelectTitle = (id: string) => {
		if (selectedHistory.find((item) => item.titleId === id)) {
			// すでに選択されている場合は解除
			setValue(
				"history",
				[...selectedHistory].filter((item) => item.titleId !== id),
			);
		} else {
			// 選択されていない場合は追加
			setValue("history", [...selectedHistory, { titleId: id }]);
		}
	};

	return (
		<div className="max-w-6xl mx-auto w-full flex-1">
			{titles.map((release, i) => (
				<div key={`release-${i.toString()}`} className="flex items-start pb-8">
					{/* 年バッヂ */}
					<Badge variant="year">{release.year}</Badge>

					<div className="flex flex-col md:flex-row gap-8">
						{release.titles.map((title, i) => (
							<TimelineItem
								key={`title-${i.toString()}`}
								title={title.name}
								region={title.region}
								selected={
									!!selectedHistory.find((item) => item.titleId === title.id)
								}
								onClickCard={() => onSelectTitle(title.id)}
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
}

export default History;
