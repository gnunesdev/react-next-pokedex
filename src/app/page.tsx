import { List } from "./components/List";
import {
  INITIAL_PAGINATION_LIMIT,
  INITIAL_PAGINATION_OFFSET,
} from "./constants";

interface SimplePokemon {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: [
    {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }
  ];
  sprites: {
    front_default: string;
  };
}

export async function getPokemons(
  limit: number,
  offset = INITIAL_PAGINATION_OFFSET
): Promise<Pokemon[]> {
  const pokemons = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const pokemonsJson = (await pokemons.json()) as { results: SimplePokemon[] };

  const pokemonDetails = pokemonsJson.results.map(async (pokemon) => {
    const pokemonDetails = await fetch(pokemon.url, {
      cache: "force-cache",
    });
    return await pokemonDetails.json();
  });

  return await Promise.all(pokemonDetails);
}

export default async function Home() {
  const pokemons = await getPokemons(INITIAL_PAGINATION_LIMIT);

  return (
    <div className="flex flex-col gap-12 bg-gray-200 p-4">
      <header>
        <input type="text" className="w-full rounded-2xl p-4 text-base" />
      </header>
      <main className="flex flex-1 flex-col gap-4">
        <List pokemons={pokemons} />
      </main>
    </div>
  );
}
