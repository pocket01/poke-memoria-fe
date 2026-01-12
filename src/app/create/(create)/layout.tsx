import CreateStepper from "@/components/organisms/CreateStepper";
import "../../globals.css";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <CreateStepper>{children}</CreateStepper>;
}
