import { fetchPokemonList } from "@/api/pokemon/api";
import Partners from "@/components/organisms/Partners";

export default async function PartnersPage() {
	const data = await fetchPokemonList();
	return <Partners pokemons={data.results} />;
}
