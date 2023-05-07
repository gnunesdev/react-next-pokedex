"use client";

import { debounce } from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import { INITIAL_PAGINATION_LIMIT } from "~/app/constants";
import { Pokemon } from "~/app/page";
import { getIsScrollFinished } from "~/app/utils";

type ListProps = {
  pokemons: Pokemon[];
};

export const List = ({ pokemons }: ListProps) => {
  const [fetchedPokemons, setFetchedPokemons] = useState(pokemons);

  const [paginationInfo, setPaginationInfo] = useState({
    limit: INITIAL_PAGINATION_LIMIT,
    offset: 0,
  });

  useEffect(() => {
    const debouncedScrollFn = debounce(getIsScrollFinished, 1000);

    window.addEventListener("scroll", debouncedScrollFn);
    return () => {
      window.removeEventListener("scroll", debouncedScrollFn);
    };
  });

  return (
    <div className="grid grid-cols-3 gap-6">
      {fetchedPokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className="flex flex-col items-center rounded-2xl bg-gray-100 p-6"
        >
          <Image
            src={pokemon.sprites.front_default}
            width={80}
            height={80}
            alt={`${pokemon.name} sprite`}
          />
          <p className="font-medium capitalize text-gray-900">{pokemon.name}</p>
          <div className="mt-2 flex items-center gap-2">
            {pokemon.types.map((type) => (
              <div className="rounded-xl bg-green-500 p-2" key={type.slot}>
                {type.type.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
