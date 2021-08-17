/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="jsx">
{`export default () => {
  const flicking0 = useRef();
  const flicking1 = useRef();

  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    setPlugins([new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        {
          flicking: flicking0.current,
          isSlidable: true
        },
        {
          flicking: flicking1.current,
          isClickable: true,
          activeClass: "active"
        }
      ]
    })]);
  }, []);

  return <Flicking ref={flicking0}
    className="mb-4"
    bounce={30}
    plugins={plugins}>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="/img/demo/bg01.jpg" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="/img/demo/bg02.jpg" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="/img/demo/bg03.jpg" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="/img/demo/bg04.jpg" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="/img/demo/bg05.jpg" />
    </div>
    <div className="flicking-panel full has-background-primary">
      <img className="panel-image" src="/img/demo/bg06.jpg" />
    </div>
  </Flicking>
  <Flicking ref={flicking1}
    moveType="freeScroll"
    bound={true}
    bounce={30}>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="/img/demo/bg01.jpg" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="/img/demo/bg02.jpg" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="/img/demo/bg03.jpg" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="/img/demo/bg04.jpg" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="/img/demo/bg05.jpg" />
    </div>
    <div className="flicking-panel thumb has-background-primary">
      <img className="thumb-image" src="/img/demo/bg06.jpg" />
    </div>
  </Flicking>
};`}
</CodeBlock>;
