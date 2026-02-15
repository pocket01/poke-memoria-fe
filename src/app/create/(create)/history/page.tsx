import { getPokemonTitles } from "@/api/history/api";
import History, { type GameRelease } from "@/components/organisms/History";

export default async function HistoryPage() {
	const titles: GameRelease[] = await getPokemonTitles();
	return <History titles={titles} />;
}
