import { Text, View } from "@react-pdf/renderer";

type Props = {
	// 枠線の方向
	borderDirection: "row" | "column";
	// 枠線の長さ
	length: number;
	// 角の線の方向
	edgeDirection?: "top" | "bottom";
	// 枠線に表示するテキスト
	borderText?: string;
};

const POKEMON_BORDERS = {
	// 左上角
	lte: "┌",
	// 左下角
	lbe: "└",
	// 右上角
	rte: "┐",
	// 右下角
	rbe: "┘",
	// 枠線（横方向）
	row: "─",
	// 枠線（縦方向）
	column: "│",
};

/**
 * ポケモン履歴書の枠線を描画するコンポーネント
 * @returns
 */
export function PokemonBorder({
	borderDirection,
	length,
	edgeDirection,
	borderText = "",
}: Props) {
	const borderChar = POKEMON_BORDERS[borderDirection];

	// 角の枠線を決定
	const edgeChar =
		edgeDirection === "top"
			? {
					start: POKEMON_BORDERS.lte,
					end: POKEMON_BORDERS.rte,
				}
			: edgeDirection === "bottom"
				? {
						start: POKEMON_BORDERS.lbe,
						end: POKEMON_BORDERS.rbe,
					}
				: undefined;
	return (
		<View
			style={{
				display: "flex",
				flexDirection: borderDirection,
			}}
		>
			{edgeChar && <Text>{edgeChar.start}</Text>}
			{borderDirection === "row" && (
				<Text>{`${borderText}${borderChar.repeat(length)}`}</Text>
			)}
			{borderDirection === "column" &&
				Array.from({ length }).map((_, index) => (
					<Text key={index.toString()}>{borderChar}</Text>
				))}
			{edgeChar && <Text>{edgeChar.end}</Text>}
		</View>
	);
}
