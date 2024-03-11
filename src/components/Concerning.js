import React from "react";
import { useGetSpeciesQuery, useGetGenderQuery } from "../data/RecoverData";

const Concerning = ({ details, id }) => {
  const species = useGetSpeciesQuery(`${id}`);
  const gender = useGetGenderQuery(`${id}`);

  if (species.isLoading || gender.isLoading) {
    return <p>Loading...</p>;
  }
  if (species.error) {
    return <p>Error: {species.error?.data || gender.error?.data}</p>;
  }

  const data = species.data || null;
  const gender_data = gender.error ? { name: "Not found" } : gender.data;

  return (
    <div className="w-[47%]">
      <div className="">
        <p className="flex justify-between mb-3">
          <span className="text-gray-500">Species</span>
          <span className="font-bold">{details.species.name}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-gray-500">Height</span>
          <span className="font-bold">{details.height}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-gray-500">Weight</span>
          <span className="font-bold">{details.weight}</span>
        </p>
        <div className="flex justify-between mb-3">
          <span className="text-gray-500">Abilities</span>
          <p>
            {details.abilities.map((el, index) => {
              return (
                <span className="font-bold ml-2" key={index}>
                  {el.ability.name}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Breeding</h2>
        <p className="flex justify-between">
          <span className="text-gray-500 py-2">Gender</span>
          <span className="font-bold">{gender_data.name}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-gray-500">Egg Groups</span>
          <span className="font-bold">{data.egg_groups[0].name}</span>
        </p>
        <p className="flex justify-between mb-3">
          <span className="text-gray-500">Egg Cycle</span>
          <span className="font-bold">{details.species.name}</span>
        </p>
      </div>
    </div>
  );
};

export default Concerning;