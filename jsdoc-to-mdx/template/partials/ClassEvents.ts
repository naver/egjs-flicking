import DocumentedClass from "../../types/class";
import Identifier from "../../types/identifier";

import Member from "./Member";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>) => {
  if (classData.events.length <= 0) return "";

  return `## Events
${classData.events.map(evt => Member(evt, dataMap)).join("\n")}`;
};
