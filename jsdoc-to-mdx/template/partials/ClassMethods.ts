import DocumentedClass from "../../types/class";

import Method from "./Method";

export default (classData: DocumentedClass) => {
  if (classData.methods.length <= 0 && classData.static.methods.length <= 0) return "";

  return `## Methods
${classData.static.methods.map(method => Method(method)).join("\n")}
${classData.methods.map(method => Method(method)).join("\n")}`;
};
