import { X } from "lucide-react";
import { PokemonAvatar } from "@/components/atoms/pokemon-avatar";
import { cn } from "@/lib/utils";
import { Card } from "../atoms/card";
import { Textarea } from "../atoms/textarea";

export interface PokemonCardProps {
	name: string;
	comment?: string;
	isEditingComment?: boolean;
	onRemove?: () => void;
	onCommentChange?: (comment: string) => void;
	onCommentBlur?: () => void;
	onCommentClick?: () => void;
	onClick?: () => void;
	className?: string;
}

export function PokemonCard({
	name,
	comment,
	isEditingComment = false,
	onRemove,
	onCommentChange,
	onCommentBlur,
	onCommentClick,
	onClick,
	className,
}: PokemonCardProps) {
	// const textareaRef = useRef<HTMLTextAreaElement>(null);

	// useEffect(() => {
	// 	if (isEditingComment && textareaRef.current) {
	// 		textareaRef.current.focus();
	// 	}
	// }, [isEditingComment]);

	const containerClass = cn(
		"cursor-pointer bg-[#F000001A] relative p-7 cursor-pointer transition-all duration-300 text-left",
		className,
	);

	const content = (
		<>
			{/* Remove button */}
			<X
				onClick={(e) => {
					e.stopPropagation();
					onRemove?.();
				}}
				className={`${cn(
					"neu-flat w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg absolute top-3 right-3",
				)} w-4 h-4`}
			/>

			{/* Pokemon display */}
			<div className="text-center mb-4 cur">
				<div className="flex justify-center mx-auto mb-3">
					<PokemonAvatar variant="filled" size="default" />
				</div>
				<h3 className="font-bold text-xl text-[#0A0A0A]">{name}</h3>
			</div>

			{/* Comment section */}
			<div className="mt-4">
				<Textarea
					defaultValue={comment || ""}
					onChange={(e) => onCommentChange?.(e.target.value)}
					onBlur={onCommentBlur}
					placeholder="思い出を記入..."
					className="w-full p-2 text-sm border border-[#C9DAEB] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#284CAC] bg-white text-[#0A0A0A]"
					rows={3}
					onClick={(e) => e.stopPropagation()}
				/>
			</div>
		</>
	);

	return <Card className={containerClass}>{content}</Card>;

	// return <Card className={containerClass}>{content}</Card>;
}
