import DocumentedClass from "../../types/class";

import Property from "./Property";

export default (classData: DocumentedClass) => {
  if (classData.members.length <= 0 && classData.static.members.length <= 0) return "";

  return `## Properties
${classData.static.members.map(member => Property(member)).join("\n")}
${classData.members.map(member => Property(member)).join("\n")}`;
};
