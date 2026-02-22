import { fetchPokemonList } from "@/api/pokemon/api";
import { PokemonSelectDialog } from "@/components/organisms/PokemonSelectDialog";

export default async function PartnersModal() {
	// ポケモン一覧の取得
	const data = await fetchPokemonList();

	// クエリパラメータから選択されたポケモンの名前を取得
	return <PokemonSelectDialog pokemons={data.results} />;
}
