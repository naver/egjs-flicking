import Flicking from "../react-flicking";

import "@egjs/flicking/dist/flicking.css";
import './DebugPage.css';
import { useRef } from "react";


// 연관 이슈 페이지
// https://oss.navercorp.com/egjs/egjs-user-voice/issues/23
// 이후에 AI에게 데모 페이지 구성의 퓨샷 예시로 제공하기.
// (이슈 환경 페이지의 이미지도 같이 제공하기)
// (위 이슈 페이지의 데모 환경 페이지를 극도로 단순화시킨 페이지라고 알려주고 데모 환경은 이런식으로 단순화시켜 표현하라고 지침)
// - 특징
//   - 바닐라 플리킹 css는 직접 임포트
//   - 리액트 플리킹 컴포넌트는 로컬에서 임포트
//   - 최대한 단순화한 페이지 레이아웃
const DebugPage: React.FC = () => {
  const flickingRef = useRef<Flicking>(null);
  const onClickPrev = () => {
    flickingRef.current?.prev();
  }
  const onClickNext = () => {
    flickingRef.current?.next();
  }

  return (
    <div className="debug-page">
      <h2>Basic Flicking Demo</h2>
      <Flicking
        ref={flickingRef}
        className="flicking"
        circular={false}
        moveType="strict"
        renderOnlyVisible={true}
        autoResize={true}
        bounce={[10,10]}
        duration={100}
        optimizeSizeUpdate={true}
      >
        <div className="item-list">
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">4</div>
          <div className="item">5</div>
        </div>
        <div className="item-list">
          <div className="item">6</div>
          <div className="item">7</div>
          <div className="item">8</div>
          <div className="item">9</div>
          <div className="item">10</div>
        </div>
        <div className="item-list">
          <div className="item">11</div>
          <div className="item">12</div>
          <div className="item">13</div>
          <div className="item">14</div>
          <div className="item">15</div>
        </div>
        <div className="item-list">
          <div className="item">16</div>
          <div className="item">17</div>
          <div className="item">18</div>
          <div className="item">19</div>
          <div className="item">20</div>
        </div>
        <div className="item-list">
          <div className="item">21</div>
          <div className="item">22</div>
          <div className="item">23</div>
          <div className="item">24</div>
          <div className="item">25</div>
        </div>
        <div className="item-list">
          <div className="item">26</div>
          <div className="item">27</div>
          <div className="item">28</div>
          <div className="item">29</div>
          <div className="item">30</div>
        </div>
        <div className="item-list">
          <div className="item">31</div>
          <div className="item">32</div>
        </div>
      </Flicking>
      <div style={{display: 'flex', justifyContent: 'center' }}>
        <button onClick={onClickPrev}>Prev</button>
        <button onClick={onClickNext}>Next</button>
      </div>
      <div className="dummy-container">
      </div>
    </div>

  );
};

export default DebugPage;