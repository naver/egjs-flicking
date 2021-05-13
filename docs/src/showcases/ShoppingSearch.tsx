/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, createRef } from "react";
import Flicking from "@egjs/react-flicking";
import "@site/src/css/showcases/shopping-search.css";

import ShoppingPanel from "./component/ShoppingPanel";

const panels = [
  <ShoppingPanel key={0} html='
  <ul>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
          class="data">찜 <em>24</em></span></div>
        </div>
      </div>
      <div class="product_etc">
        <div class="option_info">
          <span class="elss item"><span class="item_info">품질</span>상품 품질이 좋아요</span>
          <span class="elss item"><span class="item_info">디자인</span>이쁘고 만족합니다</span>
        </div>
      </div>
    </li>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
    </li>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
    </li>
  </ul>' />,
  <ShoppingPanel key={1} html='
  <ul>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
    </li>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
    </li>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
    </li>
  </ul>' />,
  <ShoppingPanel key={2} html='
  <ul>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
      <div class="product_etc">
        <div class="option_info">
          <span class="elss item"><span class="item_info">품질</span>상품 품질이 좋아요</span>
          <span class="elss item"><span class="item_info">디자인</span>이쁘고 만족합니다</span>
        </div>
      </div>
    </li>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
    </li>
    <li>
      <div class="product">
        <div class="thumb">
          <img src="https://shopping-phinf.pstatic.net/main_1695923/16959236412.20190109171141.jpg?type=f300" />
        </div>
        <div class="product_info">
          <strong class="title">애플 워치 시리즈4 44mm 스페이스그레이 알루미늄 블랙 스포츠 밴드 MU6D2KH/A</strong>
          <div class="price">최저 <strong>528,220</strong>원</div>
          <div class="reaction"><span class="data">판매처 <em>19</em></span></div>
          <div class="reaction"><span class="data point"><i class="spsh ico_star">별점</i><em>4.8</em>(35)</span><span
            class="data">찜 <em>24</em></span></div>
        </div>
      </div>
    </li>
  </ul>' />
];

export default () => {
  const flicking = createRef<Flicking>();
  const [index, setIndex] = useState(1);

  return <section className="search-section">
    <div className="api_title_area">
      <div className="api_title has-text-weight-bold is-size-6">
        <i className="spnew api_ico_shoplogo"></i>
        <span>네이버쇼핑</span>
        <i className="spnew api_ico_alert ml-1">이 정보가 표시된 이유</i>
      </div>
      <div className="api_title_sub">
        <a><span className="txt"><strong className="tit">다른 사이트 더보기</strong></span></a>
      </div>
    </div>
    <Flicking bound={true} adaptive={true} ref={flicking} className="shopping-flicking"
      onChanged={e => {
        setIndex(e.index + 1);
      }}
      onNeedPanel={e => {
        if (e.direction !== "NEXT" || e.currentTarget.panelCount >= 10) return;

        if (e.currentTarget.panelCount < 9) {
          const newPanelIndex = panels.length;
          panels.push(<ShoppingPanel key={e.currentTarget.panelCount} html='<div class="panel"><div class="loading">Importing data...</div></div>' />);
          setIndex(e.currentTarget.index + 1);

          void fetch("https://www.mocky.io/v2/5cb6cdd53200005717cd45d5?mocky-delay=1000ms").then(async html => {
            const newPanel = e.currentTarget.panels[newPanelIndex];
            newPanel.element.innerHTML = await new Response(html.body).text();
            newPanel.resize();
            e.currentTarget.viewport.setSize({ height: e.currentTarget.currentPanel.height });
          });
        } else {
          panels.push(<ShoppingPanel key={e.currentTarget.panelCount} className="more" html='<p><i class="spnew api_loader"></i><span>쇼핑<br>더보기</span></p>' />);
        }
      }}>
      { panels }
    </Flicking>
    <div className="shopping-pagination">
      <div className="cmm_pgs _pg_root">
        <a href="#" className="cmm_pg_prev _prev on" aria-disabled="true" onClick={e => {
          e.preventDefault();
          void flicking.current.prev(300);
        }}>이전</a>
        <span className="cmm_npgs">
          <span className="u_vc">현재</span><strong className="cmm_npgs_now _current">{index}</strong>
          <span className="u_vc">전체</span><span className="_total">10</span>
        </span>
        <a href="#" className="cmm_pg_next _next on" aria-disabled="false" onClick={e => {
          e.preventDefault();
          void flicking.current.next(300);
        }}>다음</a>
      </div>
    </div></section>;
};
