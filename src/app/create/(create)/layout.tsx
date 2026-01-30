import CreateStepper from "@/components/organisms/CreateStepper";
import { Header } from "@/components/organisms/Header";
import { GlobalFormProvider } from "@/context/GlobalFormProvider";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<GlobalFormProvider>
				<CreateStepper>{children}</CreateStepper>
			</GlobalFormProvider>
		</div>
	);
}
