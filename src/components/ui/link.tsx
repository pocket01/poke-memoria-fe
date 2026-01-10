import type { VariantProps } from "class-variance-authority";
import NextLink from "next/link";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LinkProps
	extends React.ComponentPropsWithoutRef<typeof NextLink>,
		VariantProps<typeof buttonVariants> {
	children?: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
	({ className, variant = "link", size, ...props }, ref) => {
		return (
			<NextLink
				ref={ref}
				className={cn(buttonVariants({ variant, size, className }))}
				{...props}
			/>
		);
	},
);
Link.displayName = "Link";

export { Link };
