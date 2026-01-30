import type { PropsWithChildren } from "react";

type Props<T> = PropsWithChildren<T>;

/**
 * デフォルトのヘッダーコンテンツ
 * @returns
 */
const DefaultHeader = () => (
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
export function Header<T>({ children = <DefaultHeader /> }: Props<T>) {
	return (
		<header className="px-8 py-6 bg-[#E3E8EE] border-b border-[#C9DAEB]">
			{children}
		</header>
	);
}
