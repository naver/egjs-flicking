import DocumentedClass from "../types/DocumentedClass";
import Identifier from "../types/Identifier";
import { inlineLink, showExtends, showInternalWarning } from "../utils";

import Import from "./partials/Import";
import ClassSummary from "./partials/ClassSummary";
import ClassConstructor from "./partials/ClassConstructor";
import ClassProperties from "./partials/ClassProperties";
import ClassMethods from "./partials/ClassMethods";
import ClassEvents from "./partials/ClassEvents";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>): string => `${Import()}
${showInternalWarning(classData)}

\`\`\`ts
class ${classData.name} ${showExtends(classData)}
\`\`\`
${inlineLink(classData.description)}

${ClassSummary(classData, dataMap)}

${ClassConstructor(classData, dataMap)}

${ClassProperties(classData, dataMap)}
${ClassMethods(classData, dataMap)}
${ClassEvents(classData, dataMap)}
`;
