"use client";
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
	const playedCount = 0;

	return (
		<div
			// initial={{ opacity: 0, y: 20 }}
			// animate={{ opacity: 1, y: 0 }}
			// exit={{ opacity: 0, y: -20 }}
			className="w-full max-w-4xl mx-auto px-4 py-8"
		>
			<PageHeader
				title="あなたが旅した地方と作品"
				description="プレイした作品にスタンプを押してください"
				playedCount={playedCount}
				className="mb-12"
			/>

			{/* Stamp Legend */}
			<StampLegend className="mb-8" />
			<div className="relative">
				{/* Vertical line */}
				<div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200" />

				<div className="space-y-6">
					{timeline.map((game) => (
						<TimelineItem
							key={game.id}
							year={game.year}
							title={game.title}
							region={game.region}
							// selectedStamp={playedGames?.[game.id]}
							// onStampClick={(type) => onToggleGame?.(game.id, type)}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default History;
