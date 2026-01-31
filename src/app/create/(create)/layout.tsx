import CreateStepper from "@/components/organisms/CreateStepper";
import { GlobalFormProvider } from "@/context/GlobalFormProvider";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<GlobalFormProvider>
			<main className="p-8">
				<CreateStepper>{children}</CreateStepper>
			</main>
		</GlobalFormProvider>
	);
}
