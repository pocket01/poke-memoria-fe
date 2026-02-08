import CreateTemplate from "@/components/templates/CreateTemplate";
import { GlobalFormProvider } from "@/context/GlobalFormProvider";

export default async function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<GlobalFormProvider>
			<main className="p-8">
				<CreateTemplate>{children}</CreateTemplate>
				{modal}
			</main>
		</GlobalFormProvider>
	);
}
