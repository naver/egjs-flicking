import React, { useState, createRef } from "react";
import Flicking from "@egjs/react-flicking";
import "@site/src/css/showcases/grafolio.css";

export default () => {
  const [index, setIndex] = useState(0);
  const flicking = createRef<Flicking>();

  return <div className="curation_area patron_reward section_patron">
    <div className="slide_area follow_area">
      <Flicking viewportTag="ul" ref={flicking} className="slide_list" id="collection_reward_list"
        align="prev" bound={true} renderOnlyVisible={true}
        onWillChange={e => { setIndex(e.index); }}>
        <li className="item">
          <div className="art_area" data-height="426">
            <img src="https://g-grafolio.pstatic.net/20190208_108/1549604950405o9IqB_JPEG/image.jpg" className="img" width="613" height="324" />
          </div>
          <div className="group_info">
            <div className="txt_area">
              <p className="title_txt">행복한 기운을 주는</p>
              <p className="sub_txt">리워드1 아코디언북+책갈피+엽서는랜덤1장+미니스티커1장</p>
            </div>
            <div className="info_creator">
              <a title="프로필로 이동" className="thumb_creator">
                <img src="https://g-grafolio.pstatic.net/20190131_33/1548945742675L7LC2_JPEG/_.jpg?type=f60_60" width="21" height="21" className="img" alt="kang mi suk" />
              </a>
              <strong className="creator_name">Rewards for <span>kang mi suk</span></strong>
            </div>
          </div>
          <div className="tag_area">
            <span className="text">When you support with <em>9,000</em>KRW or more</span>
          </div>
        </li>
        <li className="item">
          <div className="art_area">
            <img src="https://g-grafolio.pstatic.net/20190208_8/154960513649632CWN_JPEG/4.jpg" className="img" width="613" height="324" />
          </div>
          <div className="group_info">
            <div className="txt_area">
              <p className="title_txt">동네 어귀의 귀엽냥</p>
              <p className="sub_txt">길고양이 배경화면 (1920*1080)</p>
            </div>
            <div className="info_creator">
              <a title="프로필로 이동" className="thumb_creator">
                <img src="https://g-grafolio.pstatic.net/20180805_256/1533475607426rzapb_JPEG/20170526172922_dibcizxr.jpg?type=f60_60" width="21" height="21" className="img" alt="세라핌" />
              </a>
              <strong className="creator_name">Rewards for <span>세라핌</span></strong>
            </div>
          </div>
          <div className="tag_area">
            <span className="text">When you support with <em>1,000</em>KRW or more</span>
          </div>
        </li>
        <li className="item">
          <div className="art_area">
            <img src="https://g-grafolio.pstatic.net/20190208_186/1549605097261QumyA_PNG/3.PNG" className="img" width="613" height="324" />
          </div>
          <div className="group_info">
            <div className="txt_area">
              <p className="title_txt">포근하고 사랑스러운</p>
              <p className="sub_txt">유부초밥세트 [키링+엽서 4장]</p>
            </div>
            <div className="info_creator">
              <a  title="프로필로 이동" className="thumb_creator">
                <img src="https://g-grafolio.pstatic.net/20180928_219/15381226038588FnrX_PNG/8.png?type=f60_60" width="21" height="21" className="img" alt="연묘" />
              </a>
              <strong className="creator_name">Rewards for <span>연묘</span></strong>
            </div>
          </div>
          <div className="tag_area">
            <span className="text">When you support with <em>11,000</em>KRW or more</span>
          </div>
        </li>
        <li className="item">
          <div className="art_area">
            <img src="https://g-grafolio.pstatic.net/20190208_48/1549604985728SmFon_JPEG/1.jpg" className="img" width="613" height="324" />
          </div>
          <div className="group_info">
            <div className="txt_area">
              <p className="title_txt">갖고 싶은 캐리커처</p>
              <p className="sub_txt">1인 그림 그려드립니다</p>
            </div>
            <div className="info_creator">
              <a  title="프로필로 이동" className="thumb_creator">
                <img src="https://g-grafolio.pstatic.net/20180516_84/1526478023957nFcSN_PNG/_2018-05-16__10.36.41.png?type=f60_60" width="21" height="21" className="img" alt="8883" />
              </a>
              <strong className="creator_name">Rewards for <span>8883</span></strong>
            </div>
          </div>
          <div className="tag_area">
            <span className="text">When you support with <em>15,000</em>KRW or more</span>
          </div>
        </li>
        <li className="item">
          <div className="art_area">
            <img src="https://g-grafolio.pstatic.net/20190208_267/1549605057716NLHAq_PNG/5.PNG" className="img" width="613" height="324" />
          </div>
          <div className="group_info">
            <div className="txt_area">
              <p className="title_txt">소소하게 공감되는</p>
              <p className="sub_txt">귀엽고 소소한 생각들을 담은 스크린세이버</p>
            </div>
            <div className="info_creator">
              <a  title="프로필로 이동" className="thumb_creator"
              >
                <img src="https://g-grafolio.pstatic.net/20180829_268/1535521955138cPqap_JPEG/1009869profileImage.jpg?type=f60_60" width="21" height="21" className="img" alt="몬스" />
              </a>
              <strong className="creator_name">Rewards for <span>몬스</span></strong>
            </div>
          </div>
          <div className="tag_area">
            <span className="text">When you support as much as the supporter wants</span>
          </div>
        </li>
      </Flicking>
      <a href="#" role="button" className="btn_prev" style={{ display: index === 0 ? "none" : "block", "zIndex": 2000 }}
        onClick={e => {
          e.preventDefault();
          void flicking.current.moveTo(Math.max(flicking.current.index - 2, 0));
        }}
      >
        <span className="blind">이전작품 보기</span>
      </a>
      <a href="#" role="button" className="btn_next" style={{ display: index >= 3 ? "none" : "block", "zIndex": 2000 }}
        onClick={e => {
          e.preventDefault();
          void flicking.current.moveTo(Math.min(flicking.current.index + 2, flicking.current.panelCount - 1));
        }}
      >
        <span className="blind">다음작품 보기</span>
      </a>
    </div>
  </div>;
};
