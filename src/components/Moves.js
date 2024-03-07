import React from "react";

const Moves = ({ details }) => {
  const { moves } = details;

  return (
    <div className="w-[56%]">
      {moves.map((el, index) => {
        if (index >= 0 && index <= 10) {
          return (
            <div className="flex justify-between" key={index}>
              <p>{el.move.name}</p>
              <p className="font-bold mb-3">
                {el.version_group_details[0].move_learn_method.name}
              </p>
            </div>
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default Moves;
