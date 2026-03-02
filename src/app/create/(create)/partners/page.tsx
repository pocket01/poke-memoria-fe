import { fetchPokemonList } from "@/api/pokemon/api";
import Partners from "@/components/organisms/Partners";

export default async function PartnersPage() {
	// APIでポケモン一覧を取得
	const { results } = await fetchPokemonList();

	// クエリパラメータから選択されたポケモンを取得
	return <Partners pokemons={results} />;
}
