import { fetchPokemonList } from "@/api/pokemon/api";
import { PokemonSelectDialog } from "@/components/organisms/PokemonSelectDialog";

// ポケモン選択ダイアログで選択可能な最大数
const MAX_POKEMON_SELECT = 6;

export default async function PartnersModal() {
	// ポケモン一覧の取得
	const data = await fetchPokemonList();

	// ポケモン選択ダイアログ（最大6匹選択可能）
	return (
		<PokemonSelectDialog
			pokemons={data.results}
			maxSelect={MAX_POKEMON_SELECT}
			to="/create/partners"
		/>
	);
}
