import DocumentedClass from "../types/class";

import ClassSummary from "./partials/ClassSummary";
import ClassConstructor from "./partials/ClassConstructor";
import ClassProperties from "./partials/ClassProperties";
import ClassMethods from "./partials/ClassMethods";
import ClassEvents from "./partials/ClassEvents";

export default (classData: DocumentedClass): string => `
class ${classData.name} ${classData.augments ? `extends ${classData.augments.join(", ")}` : ""}

${classData.description ? classData.description : ""}

${ClassSummary(classData)}

${ClassConstructor(classData)}

${ClassProperties(classData)}
${ClassMethods(classData)}
${ClassEvents(classData)}
`;
