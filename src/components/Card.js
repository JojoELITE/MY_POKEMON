import React, { Suspense } from "react";
import { Spin } from "antd";
import { useGetPokemonQuery } from "../data/RecoverData";
import { Link } from "react-router-dom";


const Pokemon = ({ src }) => {
  return <img src={src} alt="" />;
};


const Card = ({ url }) => {
  const styles = [
    "basis-[48%] p-2 bg-yellow-700 text-white",
    "basis-[48%] p-2 bg-lime-700 text-white",
    "basis-[48%] p-2 bg-green-700 text-white",
    "basis-[48%] p-2 bg-teal-700 text-white",
    "basis-[48%] p-2 bg-cyan-700 text-white",
    "basis-[48%] p-2 bg-red-700 text-white",
    "basis-[48%] p-2 bg-orange-700 text-white",
    "basis-[48%] p-2 bg-amber-700 text-white",

  ];

  const { data, error, isLoading } = useGetPokemonQuery(url.split("pokemon/")[1]);

  const getRandomColor = () => {
    return styles[Math.floor(Math.random() * styles.length)];
  };

  if (isLoading) {
    return (
      <div className="w-[20%] mx-auto my-[40vh]">
        <Spin size="large" />;
      </div>
    );
  }
  
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  return (
    <div className={getRandomColor()}>
      <Link to={`/pokemon/${data.id}`}>
        <h2 className="font-bold text-3xl">{data.species.name}</h2>
        <div className="flex justify-between">
          
          <div className="mt-4">
            {data.abilities.map((el, index) => (
              <p className="" key={index}>
                {el.ability.name}
              </p>
            ))}
          </div>

          <div className="">
            <Suspense fallback={<Spin size="small" />}>
              <Pokemon src={data.sprites.front_default} />
            </Suspense>
          </div>

        </div>
      </Link>
    </div>
  );
};

export default Card;