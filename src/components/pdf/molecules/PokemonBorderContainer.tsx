import { View } from "@react-pdf/renderer";
import type { ComponentProps, PropsWithChildren } from "react";
import { PokemonBorder } from "../atoms/PokemonBorder";

type A4Width =
	| "3xs"
	| "2xs"
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "full";

/** @todo 現状はA4（縦）用紙サイズを基準とする */
const A4_WIDTH_CONFIG = {
	"3xs": {
		// 10%
		container: {
			width: "94pt",
		},
		width: 7,
	},
	"2xs": {
		// 20%
		container: {
			width: "127pt",
		},
		width: 10,
	},
	xs: {
		// 30%
		container: {
			width: "183pt",
		},
		width: 15,
	},
	sm: {
		// 40%
		container: {
			width: "242pt",
		},
		width: 20,
	},
	md: {
		// 50%
		container: {
			width: "307pt",
		},
		width: 26,
	},
	lg: {
		// 60%
		container: {
			width: "361pt",
		},
		width: 31,
	},
	xl: {
		// 70%
		container: {
			width: "416pt",
		},
		width: 36,
	},
	"2xl": {
		// 80%
		container: {
			width: "474pt",
		},
		width: 41,
	},
	"3xl": {
		// 90%
		container: {
			width: "527pt",
		},
		width: 46,
	},
	full: {
		// 100%
		container: {
			width: "595pt",
		},
		width: 52,
	},
} as const satisfies Record<
	A4Width,
	{ container: { width: string }; width: number }
>;

type Props = PropsWithChildren<{
	title?: string;
	borderProps?: {
		width?: A4Width;
		height?: number;
	};
	containtsStyle?: ComponentProps<typeof View>["style"];
}>;

/**
 * ポケモン履歴書の枠線を描画するコンポーネント
 * @returns
 */
export function PokemonBorderContainer({
	title = "",
	borderProps,
	containtsStyle,
	children,
}: Props) {
	const { width = "md", height = 10 } = borderProps ?? {};
	const titleBorderLength =
		A4_WIDTH_CONFIG[width].width - title.length < 0
			? 0
			: A4_WIDTH_CONFIG[width].width - title.length;
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				width: A4_WIDTH_CONFIG[width].container.width,
			}}
		>
			<PokemonBorder
				borderDirection="row"
				length={titleBorderLength}
				borderText={title}
				edgeDirection="top"
			/>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
				}}
			>
				<PokemonBorder borderDirection="column" length={height} />
				<View style={{ width: "100%", marginTop: 8, ...containtsStyle }}>
					{children}
				</View>
				<PokemonBorder borderDirection="column" length={height} />
			</View>
			<PokemonBorder
				borderDirection="row"
				length={A4_WIDTH_CONFIG[width].width}
				edgeDirection="bottom"
			/>
		</View>
	);
}
