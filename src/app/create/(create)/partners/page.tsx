import { fetchPokemonList } from "@/api/common";
import Partners from "@/components/organisms/Partners";

export default async function PartnersPage() {
	const pokemons = await fetchPokemonList();
	return <Partners pokemons={pokemons} />;
}
