import React from "react";

const Moves = ({ details }) => {
  const { moves } = details;

 return (
  <div className="w-[56%]">
    {moves.slice(0, 11).map((el, index) => (
      <div className="flex justify-between" key={index}>
        <p>{el.move.name}</p>
        <p className="font-bold mb-3">
          {el.version_group_details[0].move_learn_method.name}
        </p>
      </div>
    ))}
  </div>
 );

};

export default Moves;
