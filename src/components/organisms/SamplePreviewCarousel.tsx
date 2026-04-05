export type PreviewCardData = {
	version: string;
	title: string;
	subtitle: string;
	nickname: string;
	days: number;
	color: string;
	colorLight: string;
	colorDark: string;
};

type Props = {
	data?: PreviewCardData;
};

export function SamplePreviewCarousel({ data }: Props) {
	// デフォルトデータ
	const defaultData: PreviewCardData = {
		version: "RED",
		title: "はじまりのレポート：RED",
		subtitle: "GENERATION I • KANTO",
		nickname: "とかげ",
		days: 247,
		color: "oklch(60% 0.28 10)",
		colorLight: "oklch(55% 0.25 10 / 0.6)",
		colorDark: "oklch(50% 0.22 10)",
	};

	const cardData = data || defaultData;

	return (
		<div
			className="relative w-[380px]"
			style={{
				transform: "rotate(-2deg)",
				transformOrigin: "center",
			}}
		>
			{/* 背景グロー効果 - より強く */}
			<div
				className="absolute -inset-6 rounded-[2.5rem] blur-3xl"
				style={{
					background: `radial-gradient(circle at 35% 50%, 
            ${cardData.color} 0%,
            ${cardData.colorLight} 30%, 
            transparent 65%)`,
					opacity: 0.8,
				}}
			/>

			{/* メインカード */}
			<div
				className="relative rounded-[2rem] p-8 backdrop-blur-md"
				style={{
					background: "oklch(93% 0.01 250 / 0.9)",
					boxShadow: `
            20px 20px 40px oklch(85% 0.015 250 / 0.7),
            -20px -20px 40px oklch(98% 0.005 250 / 0.7),
            inset 0 0 0 1px ${cardData.color} / 0.25),
            0 0 40px ${cardData.color} / 0.4),
            0 0 60px ${cardData.color} / 0.2)
          `,
				}}
			>
				{/* タイトルエリア */}
				<div className="mb-6">
					<div className="flex items-center gap-3 mb-3">
						{/* 初代ポケモン赤のアイコン */}
						<div
							className="w-10 h-10 rounded-xl flex items-center justify-center"
							style={{
								background: "oklch(93% 0.01 250)",
								boxShadow: `
                  inset 3px 3px 6px oklch(85% 0.015 250),
                  inset -3px -3px 6px oklch(98% 0.005 250)
                `,
							}}
						>
							<div
								className="w-6 h-6 rounded-full"
								style={{
									background: cardData.color,
									boxShadow: `
                    0 2px 8px ${cardData.color} / 0.5),
                    inset 0 1px 2px oklch(100% 0 0 / 0.3)
                  `,
								}}
							/>
						</div>

						<h3
							className="text-xl tracking-wide"
							style={{
								color: "var(--pokememoria-text)",
								fontWeight: 600,
							}}
						>
							{cardData.title}
						</h3>
					</div>

					<div
						className="text-xs tracking-widest opacity-50"
						style={{ color: "var(--pokememoria-text)" }}
					>
						{cardData.subtitle}
					</div>
				</div>

				{/* 区切り線 */}
				<div
					className="h-px mb-6"
					style={{
						background: `linear-gradient(to right, 
              var(--pokememoria-shadow-dark), 
              transparent 50%,
              var(--pokememoria-shadow-dark))`,
					}}
				/>

				{/* 相棒ポケモン情報 */}
				<div className="mb-6 space-y-4">
					<div className="flex items-center justify-between">
						<span
							className="text-sm opacity-60"
							style={{ color: "var(--pokememoria-text)" }}
						>
							相棒ポケモン
						</span>
						<span
							className="text-base"
							style={{
								color: "var(--pokememoria-indigo)",
								fontWeight: 600,
							}}
						>
							ニックネーム：{cardData.nickname}
						</span>
					</div>

					<div className="flex items-center justify-between">
						<span
							className="text-sm opacity-60"
							style={{ color: "var(--pokememoria-text)" }}
						>
							共に歩んだ日々
						</span>
						<span
							className="text-base"
							style={{ color: "var(--pokememoria-text)" }}
						>
							{cardData.days}日
						</span>
					</div>
				</div>

				{/* 区切り線 */}
				<div
					className="h-px mb-6"
					style={{
						background: `linear-gradient(to right, 
              var(--pokememoria-shadow-dark), 
              transparent 50%,
              var(--pokememoria-shadow-dark))`,
					}}
				/>

				{/* 手持ちの記憶（6匹のモンスターボール） */}
				<div>
					<div
						className="text-sm mb-4 opacity-60"
						style={{ color: "var(--pokememoria-text)" }}
					>
						手持ちの記憶
					</div>

					<div className="flex gap-3 flex-wrap">
						{[...Array(6)].map((_, i) => (
							<div
								key={i.toString()}
								className="w-11 h-11 rounded-full relative"
								style={{
									background:
										i < 4
											? `linear-gradient(135deg, 
                        ${cardData.color} 0%, 
                        ${cardData.colorDark} 50%,
                        oklch(35% 0.15 10) 100%)`
											: "oklch(93% 0.01 250)",
									boxShadow:
										i < 4
											? `
                      0 6px 16px ${cardData.color} / 0.5),
                      0 2px 6px ${cardData.color} / 0.3),
                      inset 0 -2px 4px oklch(0% 0 0 / 0.4),
                      inset 0 2px 3px oklch(100% 0 0 / 0.4)
                    `
											: `
                      inset 4px 4px 8px var(--pokememoria-shadow-dark),
                      inset -4px -4px 8px var(--pokememoria-shadow-light)
                    `,
								}}
							>
								{/* モンスターボールの中央ライン */}
								{i < 4 && (
									<>
										<div
											className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2"
											style={{
												background: "oklch(15% 0.02 265)",
												boxShadow: "0 1px 2px oklch(0% 0 0 / 0.3)",
											}}
										/>
										<div
											className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-[2.5px]"
											style={{
												background:
													"linear-gradient(135deg, oklch(98% 0.005 250), oklch(90% 0.01 250))",
												borderColor: "oklch(15% 0.02 265)",
												boxShadow: `
                          inset 0 1px 2px oklch(85% 0.015 250),
                          0 2px 4px oklch(0% 0 0 / 0.3)
                        `,
											}}
										/>
									</>
								)}
							</div>
						))}
					</div>
				</div>

				{/* フッター装飾 */}
				<div className="mt-8 pt-6">
					<div
						className="flex items-center gap-2 text-xs tracking-widest opacity-20"
						style={{ color: "var(--pokememoria-text)" }}
					>
						<div
							className="w-1.5 h-1.5 rounded-full"
							style={{ background: cardData.color }}
						/>
						<span>A PRECIOUS MEMORY</span>
						<div
							className="w-1.5 h-1.5 rounded-full"
							style={{ background: cardData.color }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
