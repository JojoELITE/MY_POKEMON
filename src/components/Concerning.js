import React from "react";
import { useGetSpeciesQuery, useGetGenderQuery } from "../data/RecoverData";

const Concerning = ({ pokemonDetails, pokemonId }) => {
  const speciesQuery = useGetSpeciesQuery(`${pokemonId}`);
  const genderQuery = useGetGenderQuery(`${pokemonId}`);

  if (speciesQuery.isLoading || genderQuery.isLoading) {
    return <p>Loading...</p>;
  }
  if (speciesQuery.error) {
    return <p>Error: {speciesQuery.error?.data || genderQuery.error?.data}</p>;
  }

  const speciesData = speciesQuery.data || null;
  const genderData = genderQuery.error ? { name: "Not found" } : genderQuery.data;

  return (
    <div className="w-[47%] bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="">
        <p className="flex justify-between mb-3">
          <span className="text-slate-500">Species</span>
          <span className="font-bold">{pokemonDetails.species.name}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-slate-500">Height</span>
          <span className="font-bold">{pokemonDetails.height}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-slate-500">Weight</span>
          <span className="font-bold">{pokemonDetails.weight}</span>
        </p>
        <div className="flex justify-between mb-3">
          <span className="text-slate-500">Abilities</span>
          <p>
            {pokemonDetails.abilities.map((el, index) => {
              return (
                <span className="font-bold ml-2" key={index}>
                  {el.ability.name}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <div className="w-full mt-4 border-t pt-4">
        <h2 className="font-bold text-lg">Breeding</h2>
        <p className="flex justify-between mb-3">
          <span className="text-slate-500">Gender</span>
          <span className="font-bold">{genderData.name}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-slate-500">Egg Groups</span>
          <span className="font-bold">{speciesData.egg_groups[0].name}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-slate-500">Egg Cycle</span>
          <span className="font-bold">{pokemonDetails.species.name}</span>
        </p>
      </div>
    </div>
  );
};

export default Concerning;