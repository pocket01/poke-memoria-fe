import { cva, type VariantProps } from "class-variance-authority";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const pokemonAvatarVariants = cva(
	"flex items-center justify-center rounded-full shadow-lg transition-all",
	{
		variants: {
			variant: {
				filled: "bg-gradient-to-br from-red-400 to-pink-400",
				empty: "border-4 border-dashed border-gray-300 bg-transparent",
			},
			size: {
				default: "w-20 h-20",
				sm: "w-12 h-12",
			},
		},
		defaultVariants: {
			variant: "filled",
			size: "default",
		},
	},
);

type Props = VariantProps<typeof pokemonAvatarVariants> & {
	className?: string;
};

export function PokemonAvatar({ variant, size, className }: Props) {
	const iconSize = size === "sm" ? "w-6 h-6" : "w-10 h-10";
	const iconColor =
		variant === "filled" ? "text-white fill-current" : "text-gray-300";

	return (
		<div className={cn(pokemonAvatarVariants({ variant, size }), className)}>
			<Circle className={cn(iconSize, iconColor)} />
		</div>
	);
}
