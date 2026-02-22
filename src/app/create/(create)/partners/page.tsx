import type { SearchParams } from "nuqs";
import { fetchPokemonList } from "@/api/pokemon/api";
import Partners from "@/components/organisms/Partners";
import { searchParamsCache } from "@/lib/searchParams";

type Props = {
	searchParams: SearchParams;
};

export default async function PartnersPage({ searchParams }: Props) {
	// APIでポケモン一覧を取得
	const { results } = await fetchPokemonList();

	// クエリパラメータから選択されたポケモンを取得
	const { selectedPokemons } = await searchParamsCache.parse(searchParams);
	return <Partners selectedPokemons={selectedPokemons} pokemons={results} />;
}
