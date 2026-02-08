import { fetchPokemonList } from "@/api/common";
import { PokemonSelectDialog } from "@/components/organisms/PokemonSelectDialog";

// クエリパラメーターの型定義
type SearchParams = Promise<{
	slot: 1 | 2 | 3 | 4 | 5 | 6;
}>;

// Props型定義
type Props = {
	searchParams: SearchParams;
};

/**
 * 相棒ポケモン選択モーダルページ
 * @returns JSX.Element
 */
export default async function PartnerSelectPage({ searchParams }: Props) {
	const params = await searchParams;
	const pokemons = await fetchPokemonList();
	return <PokemonSelectDialog pokemons={pokemons} slot={params.slot} />;
}
