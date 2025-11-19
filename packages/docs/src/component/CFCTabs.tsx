import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export default ({ option, children }) => <Tabs
  groupId="cfc"
  defaultValue="js"
  lazy={true}
  values={[
    { label: "JavaScript", value: "js" },
    { label: "React", value: "react" }
  ]}>
  <TabItem value="js">
    <iframe src={`https://codesandbox.io/embed/flicking-v4-playground-zc9n9?codemirror=1&fontsize=14&hidenavigation=1&initialpath=${option}%2Findex.html&module=%2F${option}%2Findex.js&theme=dark`}
      loading="lazy"
      className="codesandbox-playground"
      title="flicking-v4-playground"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  </TabItem>
  <TabItem value="react">

  TODO

  </TabItem>
  { children }
</Tabs>;
