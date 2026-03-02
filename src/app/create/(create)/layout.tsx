import CreateTemplate from "@/components/templates/CreateTemplate";
import { GlobalFormProvider } from "@/context/GlobalFormProvider";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<GlobalFormProvider>
			<main className="p-8">
				<CreateTemplate>{children}</CreateTemplate>
			</main>
		</GlobalFormProvider>
	);
}
