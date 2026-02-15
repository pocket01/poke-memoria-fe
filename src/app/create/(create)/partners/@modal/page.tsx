import { fetchPokemonList } from "@/api/pokemon/api";
import { PokemonSelectDialog } from "@/components/organisms/PokemonSelectDialog";

export default async function PartnersModal() {
	const data = await fetchPokemonList();
	return <PokemonSelectDialog pokemons={data.results} />;
}
