/* eslint-disable @typescript-eslint/indent */
import React from "react";
import CodeBlock from "@theme/CodeBlock";

export default <CodeBlock className="jsx">
{`export default () => {
  const flicking0 = useRef();
  const flicking1 = useRef();
  const flicking2 = useRef();

  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    setPlugins([new Sync({
      type: "camera",
      synchronizedFlickingOptions: [
        {
          flicking: flicking0.current,
          isClickable: false
        },
        {
          flicking: flicking1.current,
          isClickable: false
        },
        {
          flicking: flicking2.current,
          isClickable: false
        }
      ]
    })]);
  }, []);

  return <Flicking ref={flicking0}
    className="mb-4"
    align="prev"
    bound={true}
    bounce={30}
    plugins={plugins}>
    <span className="button mr-2 is-white">🍎 Apple</span>
    <span className="button mr-2 is-white">🍉 Watermelon</span>
    <span className="button mr-2 is-white">🥝 Kiwi</span>
    <span className="button mr-2 is-white">...</span>
  </Flicking>
  <Flicking ref={flicking1}
    className="mb-4"
    align="prev"
    bound={true}
    bounce={30}>
    <span className="button mr-2 is-white">🍔 Hamburger</span>
    <span className="button mr-2 is-white">🍕 Pizza</span>
    <span className="button mr-2 is-white">🍞 Bread</span>
    <span className="button mr-2 is-white">...</span>
  </Flicking>
  <Flicking ref={flicking2}
    align="prev"
    bound={true}
    bounce={30}>
    <span className="button mr-2 is-white">🥛 Milk</span>
    <span className="button mr-2 is-white">☕ Coffee</span>
    <span className="button mr-2 is-white">🍵 Green tea</span>
    <span className="button mr-2 is-white">...</span>
  </Flicking>
};`}
</CodeBlock>;
