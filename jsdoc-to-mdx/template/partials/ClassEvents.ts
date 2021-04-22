import DocumentedClass from "../../types/DocumentedClass";
import Identifier from "../../types/Identifier";

import Member from "./Member";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>, locale: string) => {
  if (classData.events.length <= 0) return "";

  return `## Events
${classData.events.map(evt => Member(evt, dataMap, locale)).join("\n")}`;
};
