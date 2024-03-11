import React, { Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPokemonQuery } from "../data/RecoverData";
import { Spin, Tabs } from "antd";
import { BsArrowLeft } from "react-icons/bs";
import { FaHeart } from 'react-icons/fa';
import Concerning from "./Concerning";
import Stats from "./Stats";
import Moves from "./Moves";


const DetailsPoke = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetPokemonQuery(`${id}`);
  const label = ["About", "Base Stats", "Moves"];

  const styles = [
    " mx-auto rounded-xl border-[2px] bg-red-700 text-white",
    " mx-auto rounded-xl border-[2px] bg-orange-700 text-white",
    " mx-auto rounded-xl border-[2px] bg-amber-700 text-white",
    " mx-auto rounded-xl border-[2px] bg-yellow-700 text-white",
    " mx-auto rounded-xl border-[2px] bg-lime-700 text-white",
    " mx-auto rounded-xl border-[2px] bg-green-700 text-white",
    " mx-auto rounded-xl border-[2px] bg-teal-700 text-white",
    " mx-auto rounded-xl border-[2px] bg-cyan-700 text-white",
  ];
  const getRandomColor = () => {
    return styles[Math.floor(Math.random() * styles.length)];
  };
  if (isLoading) {
    return (
      <>
        <div className="w-[20%] mx-auto my-[40vh]">
          <Spin size="large" />;
        </div>
      </>
    );
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className={getRandomColor()}>
      <div className="w-full p-4">
        <div className="w-full flex justify-between px-10">
          <BsArrowLeft
            onClick={() => navigate(-1)}
            style={{ cursor: 'pointer', color: 'gold' }}
          />          
          <FaHeart size={20} style={{ color: 'gold' }} />
        </div>
        <div className="px-10">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="w-full flex justify-between">
            <div className="text-lg font-bold">
              {data.abilities.map((el, index) => (
                <span
                  className="mr-2 px-3 py-1 text-xs text-black bg-gray-100 rounded-lg"
                  key={index}>
                  {el.ability.name}
                </span>
              ))}
            </div>
            <span className="font-bold">#00{data.id}</span>
          </div>
          <div className="w-48 h-48 mx-auto">
            <Suspense fallback={<Spin size="small" />}>
              <img src={data.sprites.front_default} alt="alt" className="w-full" />
            </Suspense>
          </div>
        </div>
      </div>
  
      <div className="w-full p-4 bg-white rounded-t-[2rem]">
        <Tabs
          centered
          defaultActiveKey="1"
          items={new Array(3).fill(null).map((_, i) => {
            const tabId = String(i + 1);
            let child = undefined;
            switch (label[i]) {
              case "About":
                child = <Concerning details={data} id={id} />;
                break;
              case "Base Stats":
                child = <Stats details={data} />;
                break;
              case "Moves":
                child = <Moves details={data} />;
                break;
              default:
                break;
            }
            return {
              label: label[i],
              key: tabId,
              children: child,
            };
          })}
        />
      </div>
    </div>
  );  
};

export default DetailsPoke;