import DocumentedClass from "../../types/DocumentedClass";
import Identifier from "../../types/Identifier";

import Member from "./Member";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>, locale: string) => {
  if (classData.members.length <= 0 && classData.static.members.length <= 0) return "";

  return `## Properties
${classData.static.members.map(member => Member(member, dataMap, locale)).join("\n")}
${classData.members.map(member => Member(member, dataMap, locale)).join("\n")}`;
};