import { fetchPokemonList } from "@/api/pokemon/api";
import Complete from "@/components/organisms/Complete";

export default async function CompletePage() {
	const { results } = await fetchPokemonList();
	return <Complete pokemons={results} />;
}
