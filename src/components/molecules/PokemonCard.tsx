import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { PokemonAvatar } from "@/components/atoms/pokemon-avatar";
import { cn } from "@/lib/utils";
import { Button } from "../atoms/button";
import { Card } from "../atoms/card";

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (isEditingComment && textareaRef.current) {
			textareaRef.current.focus();
		}
	}, [isEditingComment]);

	const containerClass = cn(
		"cursor-pointer bg-[#F000001A] relative p-7 cursor-pointer transition-all duration-300 text-left",
		className,
	);

	const content = (
		<>
			{/* Remove button */}
			<Button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onRemove?.();
				}}
				className={cn(
					"neu-flat w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg absolute top-3 right-3",
				)}
			>
				<X className="w-4 h-4" />
			</Button>

			{/* Pokemon display */}
			<div className="text-center mb-4 cur">
				<div className="flex justify-center mx-auto mb-3">
					<PokemonAvatar variant="filled" size="default" />
				</div>
				<h3 className="font-bold text-xl text-[#0A0A0A]">{name}</h3>
			</div>

			{/* Comment section */}
			<div className="mt-4">
				{isEditingComment ? (
					<textarea
						ref={textareaRef}
						defaultValue={comment || ""}
						onChange={(e) => onCommentChange?.(e.target.value)}
						onBlur={onCommentBlur}
						placeholder="思い出を記入..."
						className="w-full p-2 text-sm border border-[#C9DAEB] rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#284CAC] bg-white text-[#0A0A0A]"
						rows={3}
						onClick={(e) => e.stopPropagation()}
					/>
				) : (
					<button
						type="button"
						className="w-full text-left min-h-[60px] p-2 text-sm text-[#4A5565] bg-white rounded-lg hover:bg-[#F0F2F5] transition-colors border border-[#C9DAEB]"
						onClick={(e) => {
							e.stopPropagation();
							onCommentClick?.();
						}}
					>
						{comment || "思い出を記入..."}
					</button>
				)}
			</div>
		</>
	);

	if (onClick) {
		return (
			<Card className={containerClass} onClick={onClick}>
				{content}
			</Card>
		);
	}

	return <Card className={containerClass}>{content}</Card>;
}
