/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useMemo } from "react";
import Flicking from "@egjs/react-flicking";
import "@site/src/css/showcases/post.css";

export default () => {
  const [index, setIndex] = useState(0);

  const flickingClasses = useMemo(() => {
    const classes = ["flicking"];
    if (index > 0) {
      classes.push("read");
    }

    return classes;
  }, [index]);

  return <div className="posts mb-6">
    <div className="background"></div>
    <div className="header">
      <img src={require("@site/static/img/post-images/post.png").default} />
    </div>
    <Flicking className={flickingClasses.join(" ")} bound={true} duration={300}
      onMove={e => {
        const windowSize = 280;
        const flick = e.currentTarget.camera.position;
        const header = document.querySelector(".posts .header") as HTMLElement;

        header.style.opacity = ((windowSize - flick) / windowSize).toString();
      }}
      onWillChange={e => {
        setIndex(e.index);
      }}
    >
      <div className="post-panel main">
        <img src={require("@site/static/img/post-images/img_0.png").default} />
      </div>
      <div className="post-panel post">
        <img src={require("@site/static/img/post-images/img_1.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_2.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_3.png").default} />
      </div>
      <div className="post-panel post">
        <img src={require("@site/static/img/post-images/img_4.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_5.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_6.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_7.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_8.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_9.png").default} />
      </div>
      <div className="post-panel post ">
        <img src={require("@site/static/img/post-images/img_10.png").default} />
      </div>
    </Flicking>
    <div className="post-footer">
      <div className="post-pagination" style={{ opacity: index < 1 || index > 8 ? 0 : 1 }}>
        <div className="current">{ Math.max(Math.min(index, 8), 1) }</div>
      </div>
      <img src={require("@site/static/img/post-images/bottom.png").default} />
    </div>
    <div className="all">
      <div className="img-area">
        <img src={require("@site/static/img/post-images/thumb.png").default} />
        <a href="#" style={{ left: "92%", top: "0%", width: "7%", height: "6%" }}></a>
        <a href="#" style={{ left: "0px", top: "10%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "34%", top: "10%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "68%", top: "10%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "0px", top: "40%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "34%", top: "40%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "68%", top: "40%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "0px", top: "71%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "34%", top: "71%", width: "32%", height: "30%" }}></a>
        <a href="#" style={{ left: "68%", top: "71%", width: "32%", height: "30%" }}></a>
      </div>
    </div>
  </div>;
};
