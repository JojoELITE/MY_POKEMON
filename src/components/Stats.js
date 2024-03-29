import React from "react";
import { Progress } from "antd";

const Stats = ({ details }) => {
  const { stats } = details;
  return (
    <div>
      {stats.map((el, index) => (
        <div className="flex w-full" key={index}>
          <p className="w-[15%] text-gray-500 font-bold">{el.stat.name.toUpperCase()}</p>
          <p className="w-[15%] font-bold mb-3">{el.base_stat}</p>
          <div className="w-[60%]">
            <Progress 
              percent={el.base_stat}
              status={el.base_stat >= 50 ? "" : "exception"}
              showInfo={false}
            />
          </div> 
        </div>
      ))}
      <div className="my-2">
        <h6 className="font-bold text-lg">Type defenses</h6>
        <p className="py-2">The effectiveness of each type on {details.species.name }</p>
      </div>
    </div>
  );  
};

export default Stats;