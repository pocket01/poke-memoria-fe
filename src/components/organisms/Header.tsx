import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props<T> = PropsWithChildren<T> & {
	className?: string;
};

/**
 * デフォルトのヘッダーコンテンツ
 * @returns
 */
export const DefaultHeader = () => (
	<div className="flex flex-col gap-1">
		<h1 className="text-3xl font-bold leading-tight text-[#284CAC]">
			ポケメモリア
		</h1>
		<p className="text-sm text-[#4A5565]">ポケモン履歴書作成ツール</p>
	</div>
);

/**
 * ヘッダーコンポーネント
 * @param props.children ヘッダーコンテンツ
 * @returns
 */
export function Header<T>({ children, className }: Props<T>) {
	return children && <header className={cn(className)}>{children}</header>;
}
