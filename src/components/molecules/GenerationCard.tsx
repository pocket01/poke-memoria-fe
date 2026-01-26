import {
	BookOpen,
	Check,
	Circle,
	Diamond,
	Dna,
	Feather,
	Flame,
	Leaf,
	Moon,
	Shield,
	Sun,
	Sword,
} from "lucide-react";
import type { PokemonGenerations } from "@/types/schema";
import { Card, CardContent, CardDescription, CardTitle } from "../atoms/card";

type GenerationCardProps = Pick<
	PokemonGenerations,
	"gen" | "name" | "generation" | "year"
> & {
	/** 選択状態 */
	selected?: boolean;
	/** クリック時のイベントハンドラ */
	onClick?: (gen: number) => void;
	/** 追加のクラス名 */
	className?: string;
};

/** @todo カラーパレット定数化は後ほど */
// color1, color2に各世代の初登場タイトルの色を指定。color3にマイナーチェンジ版のカラーを指定。
const genColors = [
	{
		// 赤・緑
		gen: 1,
		color1: "#FF0000",
		color2: "#00FF00",
		icon1: Flame,
		icon2: Leaf,
	},
	{
		// 金・銀
		gen: 2,
		color1: "#D4AF37",
		color2: "#C0C0C0",
		icon1: Feather,
		icon2: Feather,
	},
	{
		// ルビー・サファイア
		gen: 3,
		color1: "#E0115F",
		color2: "#0F52BA",
		icon1: Diamond,
		icon2: Diamond,
	},
	{
		// ダイヤモンド・パール
		gen: 4,
		color1: "#B9F2FF",
		color2: "#FADADD",
		icon1: Diamond,
		icon2: Circle,
	},
	{
		// ブラック・ホワイト
		gen: 5,
		color1: "#000000",
		color2: "#FFFFFF",
		icon1: Circle,
		icon2: Circle,
	},
	{
		// X・Y
		gen: 6,
		color1: "#0000FF",
		color2: "#FF0000",
		icon1: Dna,
		icon2: Dna,
	},
	{
		// サン・ムーン
		gen: 7,
		color1: "#FF8C00",
		color2: "#483D8B",
		icon1: Sun,
		icon2: Moon,
	},
	{
		// ソード・シールド
		gen: 8,
		color1: "#00AEEF",
		color2: "#EC008C",
		icon1: Sword,
		icon2: Shield,
	},
	{
		// スカーレット・バイオレット
		gen: 9,
		color1: "#FF2400",
		color2: "#8A2BE2",
		icon1: BookOpen,
		icon2: BookOpen,
	},
];

/**
 * ポケモン世代カードコンポーネント（Molecules層）
 * 各世代の情報を表示するカード
 * @param props GenerationCardProps
 * @returns JSX.Element
 */
export function GenerationCard({
	gen,
	name,
	generation,
	year,
	selected = false,
	onClick,
	className = "",
}: GenerationCardProps) {
	const genInfo = genColors.find((c) => c.gen === gen);
	return (
		<Card
			onClick={() => onClick?.(gen)}
			className={`p-0 flex flex-row items-center gap-0 relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer ${
				selected && "transition-all duration-300 scale-105 bg-red-50"
			} ${className}`}
		>
			{/* 左側のグラデーションバー */}
			<div
				className="ml-8 w-8 h-full"
				style={{
					background: genInfo
						? `linear-gradient(180deg, ${genInfo.color1}, ${genInfo.color2})`
						: undefined,
				}}
				aria-hidden="true"
			/>

			<CardContent className="mx-4 grow flex flex-col items-start gap-4 py-8 px-0 flex-1">
				{/* テキスト情報 */}
				{/* チェックマーク */}
				{selected && (
					<Check
						className="absolute top-3 right-3 w-8 h-8 bg-[#FB2C36] rounded-full flex items-center justify-center shadow-lg text-white p-1 z-10"
						strokeWidth={3}
					/>
				)}
				<CardTitle className="text-2xl font-bold">{name}</CardTitle>
				<CardDescription>{generation}</CardDescription>
				<CardDescription>{year}</CardDescription>
				{genInfo?.icon1 && (
					<genInfo.icon1
						className="absolute bottom-3 right-16"
						style={{
							color: genInfo.color1,
							borderColor: genInfo.color2,
						}}
						size={28}
						fill={genInfo.color1}
					/>
				)}
				{genInfo?.icon2 && (
					<genInfo.icon2
						className="absolute bottom-3 right-4"
						style={{
							color: genInfo.color2,
							borderColor: genInfo.color1,
						}}
						size={28}
						fill={genInfo.color2}
					/>
				)}
			</CardContent>
		</Card>
	);
}
