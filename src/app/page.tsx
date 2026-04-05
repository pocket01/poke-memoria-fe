"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";
import {
	type PreviewCardData,
	SamplePreviewCarousel,
} from "@/components/organisms/SamplePreviewCarousel";

export default function Home() {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [fadeIn, setFadeIn] = useState(true);
	const router = useRouter();
	const onStart = () => {
		router.push("/create");
	};

	// 様々な履歴書データ
	const cardVariations: PreviewCardData[] = [
		{
			version: "RED",
			title: "はじまりのレポート：RED",
			subtitle: "GENERATION I • KANTO",
			nickname: "とかげ",
			days: 247,
			color: "oklch(60% 0.28 10)",
			colorLight: "oklch(55% 0.25 10 / 0.6)",
			colorDark: "oklch(50% 0.22 10)",
		},
		{
			version: "GREEN",
			title: "はじまりのレポート：GREEN",
			subtitle: "GENERATION I • KANTO",
			nickname: "みどり",
			days: 189,
			color: "oklch(60% 0.20 140)",
			colorLight: "oklch(55% 0.18 140 / 0.6)",
			colorDark: "oklch(50% 0.16 140)",
		},
		{
			version: "BLUE",
			title: "はじまりのレポート：BLUE",
			subtitle: "GENERATION I • KANTO",
			nickname: "みずいろ",
			days: 312,
			color: "oklch(60% 0.18 230)",
			colorLight: "oklch(55% 0.16 230 / 0.6)",
			colorDark: "oklch(50% 0.14 230)",
		},
		{
			version: "YELLOW",
			title: "はじまりのレポート：YELLOW",
			subtitle: "GENERATION I • KANTO",
			nickname: "ピカ",
			days: 405,
			color: "oklch(70% 0.18 90)",
			colorLight: "oklch(65% 0.16 90 / 0.6)",
			colorDark: "oklch(60% 0.14 90)",
		},
	];

	// 3秒ごとにカードを切り替え
	useEffect(() => {
		const interval = setInterval(() => {
			// フェードアウト
			setFadeIn(false);

			// 0.5秒後にカードを切り替えてフェードイン
			setTimeout(() => {
				setCurrentCardIndex((prev) => (prev + 1) % cardVariations.length);
				setFadeIn(true);
			}, 500);
		}, 3500);

		return () => clearInterval(interval);
	}, []);

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-between p-8 md:p-12"
			style={{
				backgroundColor: "var(--pokememoria-bg)",
				fontFamily: "system-ui, -apple-system, sans-serif",
			}}
		>
			{/* ヘッダースペース */}
			<div className="flex-1" />

			{/* メインコンテンツ */}
			<div className="flex flex-col items-center space-y-12 md:space-y-16 max-w-lg w-full">
				{/* タイトルロゴ */}
				<div className="w-full">
					<h1
						className="text-5xl md:text-6xl tracking-wider text-center select-none"
						style={{
							color: "var(--pokememoria-text)",
							textShadow: `
                2px 2px 4px var(--pokememoria-shadow-dark),
                -2px -2px 4px var(--pokememoria-shadow-light),
                2px -2px 4px var(--pokememoria-shadow-light),
                -2px 2px 4px var(--pokememoria-shadow-dark)
              `,
							letterSpacing: "0.15em",
						}}
					>
						ポケメモリア
					</h1>
				</div>

				{/* アプリ説明メッセージ */}
				<div className="w-full -mt-4">
					<p
						className="text-lg md:text-xl tracking-wide text-center select-none"
						style={{
							color: "var(--pokememoria-text)",
							opacity: 0.7,
							textShadow: `
                1px 1px 2px var(--pokememoria-shadow-dark),
                -1px -1px 2px var(--pokememoria-shadow-light)
              `,
							letterSpacing: "0.08em",
						}}
					>
						あなたとポケモンとの思い出を教えてください。
					</p>
				</div>

				{/* メインビジュアル - 履歴書プレビューカード */}
				<div className="relative w-full flex items-center justify-center min-h-[480px]">
					<div
						className="transition-opacity duration-500"
						style={{
							opacity: fadeIn ? 1 : 0,
						}}
					>
						<SamplePreviewCarousel data={cardVariations[currentCardIndex]} />
					</div>
				</div>

				{/* STARTボタン */}
				<Button
					onClick={onStart}
					className="group relative w-32 h-32 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
					// 		onMouseDown={(e) => {
					// 			e.currentTarget.style.boxShadow = `
					//   6px 6px 12px var(--pokememoria-shadow-dark),
					//   -6px -6px 12px var(--pokememoria-shadow-light),
					//   inset 4px 4px 8px rgba(0,0,0,0.2)
					// `;
					// 		}}
					// 		onMouseUp={(e) => {
					// 			e.currentTarget.style.boxShadow = `
					//   12px 12px 24px var(--pokememoria-shadow-dark),
					//   -12px -12px 24px var(--pokememoria-shadow-light),
					//   inset 0 0 0 rgba(0,0,0,0)
					// `;
					// 		}}
				>
					<span
						className="text-xl tracking-widest"
						style={{
							color: "var(--pokememoria-shadow-light)",
							textShadow: "0 2px 4px rgba(0,0,0,0.3)",
						}}
					>
						START
					</span>

					{/* リング装飾 */}
					<div
						className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						style={{
							boxShadow: "inset 0 0 20px rgba(255,255,255,0.2)",
						}}
					/>
				</Button>

				{/* コピーライト */}
				<div
					className="text-xs tracking-wider opacity-40"
					style={{ color: "var(--pokememoria-text)" }}
				>
					© 2026 Pokememoria Project
				</div>
			</div>

			{/* フッタースペース */}
			<div className="flex-1" />
		</div>
	);
}
