import DocumentedClass from "../../types/class";

export default (classData: DocumentedClass) => {
  const entries: string[] = [];
  const values: string[][] = [];

  if (classData.members.length > 0 || classData.static.members.length > 0) {
    entries.push("properties");
    values.push([
      ...classData.static.members.map(identifier => `[${identifier.name}](#${identifier.name})`),
      ...classData.members.map(identifier => `[${identifier.name}](#${identifier.name})`)
    ]);
  }
  if (classData.methods.length > 0 || classData.static.methods.length > 0) {
    entries.push("methods");
    values.push([
      ...classData.static.methods.map(identifier => `[${identifier.name}](#${identifier.name})`),
      ...classData.methods.map(identifier => `[${identifier.name}](#${identifier.name})`)
    ]);
  }
  if (classData.events.length > 0) {
    entries.push("events");
    values.push([
      ...classData.events.map(identifier => `[${identifier.name}](#event-${identifier.name})`)
    ]);
  }

  if (entries.length <= 0) return "";

  return `|${entries.join("|")}|\n|${entries.map(() => "---").join("|")}|\n|${values.map(val => val.join("<br/>")).join("|")}|`;
};
