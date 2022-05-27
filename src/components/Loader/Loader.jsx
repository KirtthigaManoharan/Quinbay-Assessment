import React from "react";

export const Loader = () => {
  return (
    <div className="flexbox">
      <div>
        <div className="mesh-loader">
          <div className="mesh-loader-set-one">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="mesh-loader-set-two">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

