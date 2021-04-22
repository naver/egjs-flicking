import DocumentedClass from "../../types/DocumentedClass";
import Identifier from "../../types/Identifier";

import Member from "./Member";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>, locale: string) => {
  if (classData.methods.length <= 0 && classData.static.methods.length <= 0) return "";

  return `## Methods
${classData.static.methods.map(method => Member(method, dataMap, locale)).join("\n")}
${classData.methods.map(method => Member(method, dataMap, locale)).join("\n")}`;
};
