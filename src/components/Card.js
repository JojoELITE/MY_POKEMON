import React, { Suspense } from "react";
import { useGetPokemonQuery } from "../data/RecoverData";
import { Spin } from "antd";
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
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }
  
  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }
  
  
  return (
    <div className={getRandomColor()}>
      <Link to={`/pokemon/${data.id}`} className="block p-4 rounded-lg">
        <h2 className="font-bold text-3xl">{data.species.name}</h2>
        <div className="flex items-center justify-between mt-4">
          
          <div>
            {data.abilities.map((el, index) => (
              <p className="" key={index}>
                {el.ability.name}
              </p>
            ))}
          </div>
  
          <div>
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