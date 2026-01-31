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
import { Card, CardDescription, CardTitle } from "../atoms/card";

type Props = Pick<
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
 * ポケモン世代カードコンポーネント
 * 各世代の情報を表示するカード
 * @param props Props
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
}: Props) {
	const genInfo = genColors.find((c) => c.gen === gen);
	return (
		<Card
			onClick={() => onClick?.(gen)}
			className={`hp-7 flex flex-col gap-4 relative overflow-hidden transition-all duration-300 cursor-pointer ${
				selected
					? `neu-pressed border-2 [border-${genInfo?.color1}]`
					: "hover:scale-105 neu-hover"
			} rounded-2xl ${className}`}
		>
			{/* チェックマーク */}
			{selected && (
				<Check className="neu-flat absolute top-4 right-4 w-8 h-8 bg-[#EF4444] rounded-full flex items-center justify-center text-white font-bold z-10 text-base" />
			)}

			{/* ポケモンアイコン */}
			<div className="flex gap-4 items-center justify-center">
				{genInfo?.icon1 && (
					<genInfo.icon1
						style={{ color: genInfo.color1 }}
						size={28}
						fill={genInfo.color1}
					/>
				)}
				{genInfo?.icon2 && (
					<genInfo.icon2
						style={{ color: genInfo.color2 }}
						size={28}
						fill={genInfo.color2}
					/>
				)}
			</div>

			{/* テキスト情報 */}
			<div className="text-center">
				<CardTitle className="font-bold text-[#0A0A0A] mb-2">{name}</CardTitle>
				<CardDescription className="text-sm text-[#4A5565] mb-1">
					{generation}
				</CardDescription>
				<CardDescription className="text-xs text-[#6A7282]">
					{year}
				</CardDescription>
			</div>
		</Card>
	);
}
