import type { LucideIcon } from "lucide-react";
import { Clock, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type StampIconType = "release" | "later" | "remake";

type StampIconProps = {
	type: StampIconType;
	size?: number;
	className?: string;
};

const stampIconConfig: Record<
	StampIconType,
	{ icon: LucideIcon; color: string; label: string }
> = {
	release: {
		icon: Star,
		color: "#EF4444", // red-500
		label: "発売時",
	},
	later: {
		icon: Clock,
		color: "#3B82F6", // blue-500
		label: "後から",
	},
	remake: {
		icon: Sparkles,
		color: "#8B5CF6", // purple-500
		label: "リメイク",
	},
};

/**
 * スタンプアイコンコンポーネント
 * ポケモン作品のプレイタイミングを示すアイコンを表示
 */
export function StampIcon({ type, size = 16, className }: StampIconProps) {
	const config = stampIconConfig[type];
	const Icon = config.icon;

	return (
		<Icon
			size={size}
			className={cn(className)}
			style={{ color: config.color }}
			aria-label={config.label}
		/>
	);
}

// 設定オブジェクトもエクスポートして再利用可能に
export { stampIconConfig };
