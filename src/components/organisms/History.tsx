"use client";
import { useState } from "react";
import PageHeader from "../molecules/PageHeader";
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
	timeline: GameEntry[];
	// playedGames: Record<string, "release" | "later" | "remake" | null>;
	// onToggleGame: (
	// 	gameId: string,
	// 	stampType: "release" | "later" | "remake",
	// ) => void;
};

function History({ timeline }: Props) {
	const [playedGames, setPlayedGames] = useState<
		Record<string, "release" | "later" | "remake" | null>
	>({});

	const playedCount = Object.values(playedGames).filter(
		(stamp) => stamp !== null,
	).length;

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
		<main className="w-full flex-1 flex flex-col px-6 py-8">
			<div className="max-w-6xl mx-auto w-full flex-1">
				<PageHeader
					title="あなたが旅した地方と作品"
					description="プレイした作品にスタンプを押してください"
					playedCount={playedCount}
					countLabel="作品プレイ済み"
					className="mb-12"
				/>

				{/* Stamp Legend */}
				<StampLegend className="mb-12" />
				<div className="relative">
					{/* Vertical line */}
					<div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B8E3D2] to-[#284CAC]" />

					<div className="space-y-6 ml-8">
						{timeline.map((game) => (
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
		</main>
	);
}

export default History;
