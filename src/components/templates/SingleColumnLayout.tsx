import type { ComponentProps, PropsWithChildren } from "react";
import Footer from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";

type Props<T> = {
	header?: ComponentProps<typeof Header>;
	footer?: ComponentProps<typeof Footer>;
} & PropsWithChildren<T>;

/**
 * シングルカラムレイアウトコンポーネント
 * @param props.header ヘッダーコンテンツ
 * @param props.footer フッターコンテンツ
 * @param props.children 子コンポーネント
 * @returns
 */
export default function SingleColumnLayout<T>({
	header,
	footer,
	children,
}: Props<T>) {
	return (
		<>
			<Header {...header} />
			{children}
			<Footer {...footer} />
		</>
	);
}
