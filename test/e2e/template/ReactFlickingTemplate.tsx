import Flicking from "../../../packages/react-flicking/src/react-flicking/Flicking";
import "../../../css/flicking.css";
import { Fixture } from "../types";

export default (fixture: Fixture) => {
  const { styles, panels, options } = fixture;

  console.log(options);

  styles.forEach(style => require(`../public/${style}`));

  return <Flicking {...options}>
    {
      panels.map(panel => {
        const Tag = panel.tag as any;

        return <Tag className={panel.class}>{panel.text}</Tag>;
      })
    }
  </Flicking>;
};
