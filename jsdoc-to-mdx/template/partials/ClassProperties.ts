import DocumentedClass from "../../types/class";
import Identifier from "../../types/identifier";

import Member from "./Member";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>) => {
  if (classData.members.length <= 0 && classData.static.members.length <= 0) return "";

  return `## Properties
${classData.static.members.map(member => Member(member, dataMap)).join("\n")}
${classData.members.map(member => Member(member, dataMap)).join("\n")}`;
};
