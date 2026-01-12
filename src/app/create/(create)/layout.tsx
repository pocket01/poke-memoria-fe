import CreateStepper from "@/components/organisms/CreateStepper";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <CreateStepper>{children}</CreateStepper>;
}
