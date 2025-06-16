import { useRef } from "react";
import Button from '@mui/material/Button';
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import Flicking from "../react-flicking";

import "@egjs/flicking/dist/flicking.css";
import './StatePage.css';
import { useFlickingStateApi } from "../react-flicking/state-api";
import LinearProgress from "@mui/material/LinearProgress";

const DebugPage: React.FC = () => {
  const flickingRef = useRef<Flicking>(null);

  const {isReachStart, isReachEnd, progress, currentPanelIndex, totalPanelCount, moveTo} = useFlickingStateApi(flickingRef);

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
        <Button variant="contained" onClick={onClickPrev} disabled={isReachStart}>Prev</Button>
        <Button variant="contained" onClick={onClickNext} disabled={isReachEnd}>Next</Button>
      </div>
      <Stack>
        <Pagination count={totalPanelCount} page={currentPanelIndex+1} onChange={(e, v) => {
          moveTo(v-1);
        }}/>
        <LinearProgress variant="determinate" value={progress}/>
        {/* <LinearProgress variant="determinate" value={scrollProgress}/> */}
      </Stack>
    </div>

  );
};

export default DebugPage;