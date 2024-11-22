/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useEffect, useRef, useState } from "react";
import { CrossFlicking, CrossGroup } from "@egjs/react-flicking";
import "../../css/demo/crossflicking.css";

export default () => {
  const flicking = useRef<CrossFlicking>();
  const [transform, setTransform] = useState(0);
  const groups = [
    {
      name: "Spring",
      panels: [
        {
          title: "Cherry blossoms, Bird, Flowers",
          image:
            "https://cdn.pixabay.com/photo/2022/01/17/01/19/cherry-blossoms-6943659_1280.jpg",
        },
        {
          title: "Tulips, Daffodils, Flowers",
          image:
            "https://cdn.pixabay.com/photo/2016/02/13/10/35/tulips-1197602_1280.jpg",
        },
        {
          title: "Lin zhi, Tibet, Snow mountain",
          image:
            "https://cdn.pixabay.com/photo/2022/04/23/07/38/lin-zhi-7151302_1280.jpg",
        },
        {
          title: "Flowers, Beautiful flowers, Spring",
          image:
            "https://cdn.pixabay.com/photo/2015/03/26/11/06/flowers-692433_1280.jpg",
        },
        {
          title: "Spring, Flowering tree, Flower",
          image:
            "https://cdn.pixabay.com/photo/2019/05/06/19/20/spring-4183996_1280.jpg",
        },
      ],
    },
    {
      name: "Summer",
      panels: [
        {
          title: "Mountains, Lake, Trees",
          image:
            "https://cdn.pixabay.com/photo/2023/03/28/19/54/mountains-7884039_1280.jpg",
        },
        {
          title: "Beach, Sea, Island",
          image:
            "https://cdn.pixabay.com/photo/2021/08/01/12/58/beach-6514331_1280.jpg",
        },
        {
          title: "Vineyards, Nature, Vines",
          image:
            "https://cdn.pixabay.com/photo/2019/07/14/10/48/vineyards-4336787_1280.jpg",
        },
        {
          title: "Field, Sunflowers, Tree",
          image:
            "https://cdn.pixabay.com/photo/2020/07/06/06/57/field-5375784_1280.jpg",
        },
        {
          title:
            "Sea, Lighthouse, Horizon",
          image:
            "https://cdn.pixabay.com/photo/2022/09/11/09/26/sea-7446433_1280.jpg",
        },
      ],
    },
    {
      name: "Autumn",
      panels: [
        {
          title:
            "Nature, Forest, Trees",
          image:
            "https://cdn.pixabay.com/photo/2021/11/22/16/46/nature-6816877_1280.jpg",
        },
        {
          title: "Path, Trees, Autumn",
          image:
            "https://cdn.pixabay.com/photo/2019/10/31/06/58/path-4591121_960_720.jpg",
        },
        {
          title: "Maple leaves, Autumn, Leaves",
          image:
            "https://cdn.pixabay.com/photo/2017/09/26/16/32/maple-leaves-2789234_1280.jpg",
        },
        {
          title: "Forest, Nature, Autumn",
          image:
            "https://cdn.pixabay.com/photo/2019/10/19/13/00/forest-4561344_1280.jpg",
        },
      ],
    },
    {
      name: "Winter",
      panels: [
        {
          title:
            "Snowy landscape, Winter",
          image:
            "https://cdn.pixabay.com/photo/2016/11/13/13/47/snowy-landscape-1821037_1280.jpg",
        },
        {
          title: "Winter, Hochybrig, Pre-alps",
          image:
            "https://cdn.pixabay.com/photo/2019/12/15/18/24/winter-4697776_1280.jpg",
        },
        {
          title: "Road, Forest, Snow",
          image:
            "https://cdn.pixabay.com/photo/2021/01/09/20/23/road-5903402_1280.jpg",
        },
        {
          title: "Winter forest, Conifer, Snow",
          image:
            "https://cdn.pixabay.com/photo/2022/12/14/10/33/winter-forest-7655125_1280.jpg",
        },
        {
          title: "Snow, Mountain, Winter",
          image:
            "https://cdn.pixabay.com/photo/2018/04/09/16/24/snow-3304547_1280.jpg",
        },
      ],
    },
  ];

  const [index, setIndex] = useState(0);

  const onChanged = (e) => {
    setIndex(e.index);
  };

  const onMove = (e) => {
    const pos = e.currentTarget.camera._position;
    setTransform(pos / 4.9 - 46);
  };

  const onTabClick = (i: number) => {
    if (!flicking.current?.animating) {
      setIndex(i);
      flicking.current?.moveTo(i, 500).catch(() => void 0);
    }
  };

  useEffect(() => {
    flicking.current?.moveTo(0, 0);
  }, []);

  return (
    <div className="demo">
      <div className="labels">
        <a
          className="area selected"
          style={{transform: `translate(${transform}px)`}}
        >
        </a>
        {groups.map((item, i) => (
          <div className="tab" key={i}>
            <a
              className={"label " + (index === i ? "" : "")}
              onClick={() => onTabClick(i)}
            >
              {item.name}
            </a>
          </div>
        ))}
      </div>
      <CrossFlicking
        className="main"
        ref={flicking}
        bounce={1}
        preventDefaultOnDrag={true}
        moveType={"strict"}
        sideOptions={{
          moveType: "strict",
        }}
        onMove={onMove}
        onChanged={onChanged}
      >
        {groups.map((item, i) => {
          return (
            <CrossGroup key={i}>
              {item.panels.map((panel, j) => {
                return (
                  <div className="item" key={j}>
                    <img className="img scaleup" src={panel.image} />
                    <div className="info">
                      <div className="name">
                        <span className="source">
                          {item.name} Wallpaper ({j + 1}/{item.panels.length})
                        </span>
                      </div>
                      <strong className="headline">{panel.title}</strong>
                    </div>
                  </div>
                );
              })}
            </CrossGroup>
          );
        })}
      </CrossFlicking>
    </div>
  );
};
