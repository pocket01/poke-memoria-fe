import { Text, View } from "@react-pdf/renderer";
import type { ComponentProps } from "react";

type Props = {
	length: number;
	// 枠線の方向
	borderDirection?: "left" | "right";
	// 枠線に表示するテキスト
	borderText?: string;
	// コンテナのスタイル
	containerStyle?: ComponentProps<typeof View>["style"];
};

// 枠線の文字
const POKEMON_ARROW_BORDERS = {
	border: "━",
	edgeLeft: "←",
	edgeRight: "→",
};

/**
 * ポケモン履歴書の枠線を描画するコンポーネント
 * @returns
 */
export function PokemonArrowBorder({
	length,
	borderDirection = "right",
	borderText,
	containerStyle,
}: Props) {
	return (
		<View
			style={{
				flexDirection: "column",
				alignItems: "flex-start",
				justifyContent: "flex-start",
				...containerStyle,
			}}
		>
			{borderText && <Text>{borderText}</Text>}
			<Text>
				{borderDirection === "left" && POKEMON_ARROW_BORDERS.edgeLeft}
				{POKEMON_ARROW_BORDERS.border.repeat(length)}
				{borderDirection === "right" && POKEMON_ARROW_BORDERS.edgeRight}
			</Text>
		</View>
	);
}
