import type { PropsWithChildren } from "react";

type Props<T> = PropsWithChildren<T>;

/**
 * デフォルトのヘッダーコンテンツ
 * @returns
 */
const DefaultHeader = () => (
	<div className="max-w-7xl mx-auto">
		<h1 className="text-[30px] font-bold leading-[1.2em] bg-gradient-to-r from-[#FB2C36] to-[#F6339A] bg-clip-text text-transparent">
			ポケメモリア
		</h1>
		<p className="text-sm text-[#4A5565] mt-1">ポケモン履歴書作成ツール</p>
	</div>
);

/**
 * ヘッダーコンポーネント
 * @param props.children ヘッダーコンテンツ
 * @returns
 */
export function Header<T>({ children = <DefaultHeader /> }: Props<T>) {
	return (
		<header className="bg-white border-b-2 border-red-400 shadow-sm px-6 py-6">
			{children}
		</header>
	);
}
