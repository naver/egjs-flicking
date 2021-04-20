import DocumentedClass from "../../types/class";
import Identifier from "../../types/identifier";

import Member from "./Member";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>) => {
  if (classData.methods.length <= 0 && classData.static.methods.length <= 0) return "";

  return `## Methods
${classData.static.methods.map(method => Member(method, dataMap)).join("\n")}
${classData.methods.map(method => Member(method, dataMap)).join("\n")}`;
};
