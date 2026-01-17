import { Clock, Sparkles, Star } from "lucide-react";
import type { JSX } from "react";
import { Button } from "../atoms/button";

type StampType = {
	id: "release" | "later" | "remake";
	label: string;
	icon: JSX.Element;
	color: string;
};

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

const stamps: StampType[] = [
	{
		id: "release",
		label: "発売時",
		icon: <Star className="w-4 h-4" />,
		color: "#EF4444",
	},
	{
		id: "later",
		label: "後から",
		icon: <Clock className="w-4 h-4" />,
		color: "#3B82F6",
	},
	{
		id: "remake",
		label: "リメイク",
		icon: <Sparkles className="w-4 h-4" />,
		color: "#8B5CF6",
	},
];

export function History({ timeline }: Props) {
	const playedCount = 0;

	return (
		<div
			// initial={{ opacity: 0, y: 20 }}
			// animate={{ opacity: 1, y: 0 }}
			// exit={{ opacity: 0, y: -20 }}
			className="w-full max-w-4xl mx-auto px-4 py-8"
		>
			<div className="text-center mb-12">
				<h1 className="text-4xl mb-4">あなたが旅した地方と作品</h1>
				<p className="text-gray-600">
					プレイした作品にスタンプを押してください
				</p>
				<div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
					<span className="font-bold text-blue-600 text-xl">{playedCount}</span>
					<span className="text-gray-600">作品プレイ済み</span>
				</div>
			</div>

			{/* Stamp Legend */}
			<div className="flex justify-center gap-4 mb-8 flex-wrap">
				{stamps.map((stamp) => (
					<div
						key={stamp.id}
						className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full"
					>
						<div style={{ color: stamp.color }}>{stamp.icon}</div>
						<span className="text-sm">{stamp.label}</span>
					</div>
				))}
			</div>

			<div className="relative">
				{/* Vertical line */}
				<div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200" />

				<div className="space-y-6">
					{timeline.map((game) => {
						// const selectedStamp = playedGames[game.id];
						// const stampInfo = stamps.find((s) => s.id === selectedStamp);

						return (
							<div key={game.id} className="relative pl-20">
								{/* Year marker */}
								<div className="absolute left-0 top-0 w-16 text-center">
									<div
										className={`
                    w-12 h-12 mx-auto rounded-full flex items-center justify-center text-xs
                    bg-white border-2 border-gray-300 text-gray-600
                  `}
									>
										{game.year}
									</div>
								</div>

								{/* Game card */}
								<div
									className={`
                  p-4 rounded-xl border-2 transition-all duration-300
                  bg-gray-50 border-gray-200
                `}
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<h3 className="font-bold mb-1">{game.title}</h3>
											<p className="text-sm text-gray-600">{game.region}地方</p>
										</div>

										{/* Stamp buttons */}
										<div className="flex gap-2">
											{stamps.map((stamp) => (
												<Button
													key={stamp.id}
													className={`
                            p-2 rounded-lg transition-all duration-200`}
													style={{
														backgroundColor: undefined,
														color: "#9CA3AF",
													}}
													title={stamp.label}
												>
													{stamp.icon}
												</Button>
											))}
										</div>
									</div>

									{/* {selectedStamp && (
										<div className="mt-3 pt-3 border-t border-gray-200">
											<span
												className="text-xs px-3 py-1 rounded-full inline-flex items-center gap-1"
												style={{
													backgroundColor: `${stampInfo?.color}20`,
													color: stampInfo?.color,
												}}
											>
												{stampInfo?.icon}
												{stampInfo?.label}でプレイ
											</span>
										</div>
									)} */}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
