/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, createRef } from "react";
import Flicking from "@egjs/react-flicking";
import { AutoPlay, Parallax } from "@egjs/flicking-plugins";
import "@site/src/css/showcases/artwindow-mobile.css";

const plugins = [new AutoPlay(), new Parallax("img", 0.7)];

export default () => {
  const thumb = createRef<HTMLElement>();
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState("아트윈도 추천");
  const [title, setTitle] = useState("해피 발렌타인<br/>연인과 함께");

  return <div className="artwindow-mobile-banner">
    <Flicking viewportTag="ul" circular={true} plugins={plugins}
      onChanged={e => {
        const panel = e.panel;
        panel.prev().element.classList.remove("checked");
        panel.next().element.classList.remove("checked");
        panel.element.classList.add("checked");

        setCategory(panel.element.dataset.category);
        setTitle(panel.element.dataset.title.replace(/\\n/, "<br/>"));

        setIndex(e.index);
      }}>
      <li data-title="해피 발렌타인\n연인과 함께" data-category="아트윈도 추천">
        <div>
          <img src="https://shop-phinf.pstatic.net/20190211_206/shopping_1549851900807yDW3j_JPEG/%BD%C5%C3%B6_%B9%DF%B7%BB%C5%B8%C0%CEpc.jpg?type=w2048"
            alt="아트윈도 추천 배경이미지" />
        </div>
      </li>
      <li data-title="환경 가까이\n김현주 스튜디오" data-category="화제작가">
        <div>
          <img src="https://shop-phinf.pstatic.net/20190213_47/shopping_15500207529408nQKF_JPEG/456.jpg?type=w2048"
            alt="아트윈도 추천 배경이미지" />
        </div>
      </li>
      <li data-title="건축적 가구\n아르케 퍼니처" data-category="화제작가">
        <div>
          <img src="https://shop-phinf.pstatic.net/20190131_18/shopping_15489170593120HTao_PNG/PC.png?type=w2048"
            alt="아트윈도 추천 배경이미지" />
        </div>
      </li>
      <li data-title="갤러리/셀렉샵\n설 선물 앵콜" data-category="페이적립 프로모션">
        <div>
          <img src="https://shop-phinf.pstatic.net/20190130_208/shopping_15488494966201wz5u_PNG/PC_2.png?type=w2048"
            alt="아트윈도 추천 배경이미지" />
        </div>
      </li>
      <li data-title="마음 따듯한\n파스텔컬러" data-category="아트윈도 추천">
        <div>
          <img src="https://shop-phinf.pstatic.net/20190201_193/shopping_15489970539959lpy5_JPEG/%BF%C0%C3%A2%C7%E5_pc.jpg?type=w2048"
            alt="아트윈도 추천 배경이미지" />
        </div>
      </li>
      <li data-title="법고창신\n(法古創新) 이은범" data-category="화제작가">
        <div>
          <img src="https://shop-phinf.pstatic.net/20190131_291/shopping_1548917360257ccxNc_PNG/PC.png?type=w2048"
            alt="아트윈도 추천 배경이미지" />
        </div>
      </li>
    </Flicking>
    <div className="overlay">
      <em><span>{category}</span></em>
      <strong className="_1QD8Q2BflX" dangerouslySetInnerHTML={{ __html: title}}></strong>
      <a href="https://swindow.naver.com/art/event/27368"><span className="blind">내용 상세보기</span></a>
    </div>
    <div className="artwindow-mobile-progress"><span className="thumb" ref={thumb} style={{ transform: `translate(${index * 100}%)` }}></span></div>
  </div>;
};
