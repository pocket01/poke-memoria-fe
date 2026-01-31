"use client";
import { useState } from "react";
import { StampLegend } from "../molecules/StampLegend";
import { TimelineItem } from "../molecules/TimelineItem";

export type GameEntry = {
	id: string;
	title: string;
	region: string;
	year: number;
	generation: number;
};

type Props = {
	titles: GameEntry[];
	// playedGames: Record<string, "release" | "later" | "remake" | null>;
	// onToggleGame: (
	// 	gameId: string,
	// 	stampType: "release" | "later" | "remake",
	// ) => void;
};

function History({ titles }: Props) {
	// プレイ済みタイトルの状態管理
	const [playedGames, setPlayedGames] = useState<
		Record<string, "release" | "later" | "remake" | null>
	>({});

	// スタンプの切り替えハンドラー
	const handleToggleGame = (
		gameId: string,
		stampType: "release" | "later" | "remake",
	) => {
		setPlayedGames((prev) => ({
			...prev,
			[gameId]: prev[gameId] === stampType ? null : stampType,
		}));
	};

	return (
		<div className="max-w-6xl mx-auto w-full flex-1">
			<StampLegend className="mb-12" />
			<div className="relative">
				<div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B8E3D2] to-[#284CAC]" />

				<div className="space-y-6 ml-8">
					{titles.map((game) => (
						<TimelineItem
							key={game.id}
							year={game.year}
							title={game.title}
							region={game.region}
							selectedStamp={playedGames[game.id] || undefined}
							onStampClick={(type) => handleToggleGame(game.id, type)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default History;
