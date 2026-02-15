import { getPokemonGenerations } from "@/api/origin/api";
import Origin from "@/components/organisms/Origin";

export default async function OriginPage() {
	// ポケモン世代データ取得
	const data = await getPokemonGenerations();
	return <Origin data={data} />;
}
