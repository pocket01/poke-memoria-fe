import type { Metadata } from "next";
import SingleColumnLayout from "@/components/templates/SingleColumnLayout";
import { CreateSteps } from "@/constants/routes";

export const metadata: Metadata = {
	title: "ポケメモリア",
	description: "ポケメモリアは、ポケモンとあなたの思い出を記録するアプリです。",
};

const pages = CreateSteps.map((s) => s.page);
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <SingleColumnLayout pages={pages}>{children}</SingleColumnLayout>;
}
