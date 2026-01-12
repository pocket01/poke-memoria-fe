import type { PokemonGenerations } from "@/types/schema";
import { Button } from "../atoms/button";

type GenerationCardProps = Pick<
	PokemonGenerations,
	"id" | "name" | "generation" | "year"
> & {
	/** アイコンの背景色 */
	bgColor: string;
	/** 選択状態 */
	selected?: boolean;
	/** クリック時のイベントハンドラ */
	onClick?: (id: string) => void;
	/** 追加のクラス名 */
	className?: string;
};

/**
 * ポケモン世代カードコンポーネント（Molecules層）
 * 各世代の情報を表示するカード
 * @param props GenerationCardProps
 * @returns JSX.Element
 */
export function GenerationCard({
	id,
	name,
	generation,
	year,
	bgColor,
	selected = false,
	onClick,
	className = "",
}: GenerationCardProps) {
	return (
		<Button
			type="button"
			onClick={() => onClick?.(id)}
			className={`bg-white border-4 rounded-2xl p-7 transition-all hover:shadow-lg focus:outline-none focus:shadow-xl ${
				selected
					? "border-[#FB2C36] shadow-xl"
					: "border-[#E5E7EB] hover:border-[#FB2C36]"
			} ${className}`}
		>
			<div className="flex flex-col items-center gap-4">
				{/* アイコン */}
				<div
					className="w-16 h-16 rounded-full flex items-center justify-center"
					style={{ backgroundColor: bgColor }}
					aria-hidden="true"
				/>

				{/* テキスト情報 */}
				<div className="flex flex-col gap-1">
					<h3 className="text-lg font-bold text-center text-[#0A0A0A]">
						{name}
					</h3>
					<p className="text-sm text-center text-[#4A5565]">{generation}</p>
					<p className="text-xs text-center text-[#6A7282]">{year}</p>
				</div>
			</div>
		</Button>
	);
}
