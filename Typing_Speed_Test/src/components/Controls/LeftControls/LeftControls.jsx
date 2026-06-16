import React from "react";

const LeftControls = () => {
  return (
    <div className="flex items-center gap-15 text-neutral-400 text-xl font-medium px-2">
      <h2>
        WPM: <span className="text-neutral-50 text-xl">0</span>
      </h2>
      <h2 className="px-10 border-x border-neutral-600">
        Accuracy: <span className="text-neutral-50 text-xl">100%</span>
      </h2>
      <h2>
        Time: <span className="text-neutral-50 text-xl">0:60</span>
      </h2>
    </div>
  );
};

export default LeftControls;
