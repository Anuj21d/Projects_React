import React from "react";
import completedIcon from "../../../assets/images/icon-completed.svg";
import star1 from "../../../assets/images/pattern-star-1.svg";
import star2 from "../../../assets/images/pattern-star-2.svg";

const ResultImages = () => {
  return (
    <div className="pt-30 w-fit">
      <div className=" p-5 bg-green-950 rounded-full">
        <div className="p-6 bg-green-800 rounded-full box-border animate-pulse">
          <img className="scale-120" src={completedIcon} alt="Completed" />
        </div>
      </div>
    </div>
  );
};

export default ResultImages;
