import { Text, View } from "@react-pdf/renderer";
import type { ComponentProps } from "react";

type Props = {
	// 枠線に表示する名前
	name?: string;
	// 名前の最大長さ（これを超える場合は省略される）
	maxLength: number;
	// コンテナのスタイル
	containerStyle?: ComponentProps<typeof View>["style"];
	// 名前のスタイル
	nameStyle?: ComponentProps<typeof Text>["style"];
};

// 枠線の文字
const POKEMON_NAME_BORDER = "‾";

/**
 * ポケモン履歴書の名前の枠線を描画するコンポーネント
 * @returns
 */
export function PokemonNameBorder({
	name,
	maxLength,
	containerStyle,
	nameStyle,
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
			{name && (
				<Text style={{ marginBottom: 8, ...nameStyle }}>
					{name.length > maxLength ? `${name.slice(0, maxLength)}...` : name}
				</Text>
			)}
			<Text>{POKEMON_NAME_BORDER.repeat(maxLength)}</Text>
		</View>
	);
}
