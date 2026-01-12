import type { PropsWithChildren } from "react";

type Props<T> = PropsWithChildren<T>;

/**
 * フッターコンポーネント
 * @param props.children フッターコンテンツ
 * @returns
 */
export default function Footer<T>({ children }: Props<T>) {
	return <footer>{children}</footer>;
}
