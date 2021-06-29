/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/indent */
import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import JavaScriptCode from "./code/JavaScriptCode";
import ReactCode from "./code/ReactCode";
import VueCode from "./code/VueCode";
import AngularCode from "./code/AngularCode";
import Vue3Code from "./code/Vue3Code";
import { SourceContext } from "./code/type";

// eslint-disable-next-line @typescript-eslint/naming-convention
export default ({
  js, react, vue, vue3, angular, preact,
  ...otherProps
}: SourceContext) => <Tabs
    groupId="cfc"
    defaultValue="js"
    values={[
      { label: "JavaScript", value: "js" },
      { label: "React", value: "react" },
      { label: "Vue@2", value: "vue" },
      { label: "Vue@3", value: "vue3" },
      { label: "Angular", value: "angular" },
      { label: "Preact", value: "preact" }
    ]}>
    <TabItem value="js">
      { js ? js : <JavaScriptCode {...otherProps} /> }
    </TabItem>
    <TabItem value="react">
      { react ? react : <ReactCode {...otherProps} /> }
    </TabItem>
    <TabItem value="vue">
      { vue ? vue : <VueCode {...otherProps} /> }
    </TabItem>
    <TabItem value="vue3">
      { vue3 ? vue3 : <Vue3Code {...otherProps} /> }
    </TabItem>
    <TabItem value="angular">
      {angular ? angular : <AngularCode {...otherProps} /> }
    </TabItem>
    <TabItem value="preact">
      {preact ? preact : <ReactCode {...otherProps} /> }
    </TabItem>
  </Tabs>;
