import CreateStepper from "@/components/organisms/CreateStepper";
import { GlobalFormProvider } from "@/context/GlobalFormProvider";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<GlobalFormProvider>
			<CreateStepper>{children}</CreateStepper>
		</GlobalFormProvider>
	);
}
