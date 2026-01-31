import { getPokemonTitles } from "@/api/history";
import History, { type GameEntry } from "@/components/organisms/History";

export default async function HistoryPage() {
	const titles: GameEntry[] = await getPokemonTitles();
	return <History titles={titles} />;
}
