import type { PropsWithChildren } from "react";
import Footer from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";

type Props<T> = PropsWithChildren<T>;

/**
 * シングルカラムレイアウトコンポーネント
 * @param props.pages ページ配列
 * @param props.children 子コンポーネント
 * @returns
 */
export default async function SingleColumnLayout<T>({ children }: Props<T>) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
