/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from "react";

export default ({ thumbnail, demo, ...others }) => {
  const [clicked, setClicked] = useState(false);
  const wrapperClasses = ["card", "mb-6"];

  if (clicked) wrapperClasses.push("has-background-white-ter");

  return <div className={wrapperClasses.join(" ")} {...others}>
    {
      clicked
        ? demo
        : <><div className="card-image">
          <figure className="image is-4by3">
            <img src={thumbnail} style={{ objectFit: "contain" }} />
          </figure>
        </div>
        <footer className="card-footer">
          <div className="demo-show-button card-footer-item" onClick={() => setClicked(true)}>Show</div>
        </footer></>
    }
  </div>;
};
