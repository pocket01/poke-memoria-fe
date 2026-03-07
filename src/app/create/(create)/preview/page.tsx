import { getPokemonGenerations } from "@/api/origin/api";
import { fetchPokemonList } from "@/api/pokemon/api";
import Preview from "@/components/organisms/Preview";

export default async function PreviewPage() {
	// ポケモン世代データ取得
	const gens = await getPokemonGenerations();

	// ポケモン一覧を取得
	const { results } = await fetchPokemonList();
	return <Preview gens={gens} pokemons={results} />;
}
