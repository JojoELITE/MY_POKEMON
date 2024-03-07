import React, { lazy, Suspense, useState } from "react";
import { useGetAllDataQuery } from "../data/RecoverData";
import { Spin } from "antd";

const Card = lazy(() => import("./Card"));

const Interface = () => {
  const { data, error, isLoading, refetch } = useGetAllDataQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPokemon = data?.results?.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []; 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const content = (
    <div className="w-full flex flex-wrap gap-3">
      <div className="w-full flex justify-center gap-52 max-w-md mx-auto mb-5">

        <h1 className="text-4xl font-bold">Pokedex</h1>

        
        <input
          type="text"
          placeholder="Looking for a Pokémon"
          className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
        />


      </div>
      {filteredPokemon.length > 0 ? (
        filteredPokemon.map((pokemon, index) => (
          <Card key={index} url={pokemon.url} />
        ))
      ) : (
        <div className="text-center py-5 w-full">
          No Pokémon found.
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-4">
        Error: Something went wrong. Please try again later.
        <button onClick={refetch}>Retry</button>
      </div>
    );
  }

  return (
    <Suspense fallback={<Spin size="large" />}>{content}</Suspense>
  );
};

export default Interface;
