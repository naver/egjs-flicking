import DocumentedClass from "../../types/class";

import Event from "./Event";

export default (classData: DocumentedClass) => {
  if (classData.events.length <= 0) return "";

  return `## Events
${classData.events.map(evt => Event(evt)).join("\n")}`;
};
