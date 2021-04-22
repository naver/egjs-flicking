import DocumentedClass from "../../types/DocumentedClass";
import Identifier from "../../types/Identifier";
import { showParameters } from "../../utils";

export default (classData: DocumentedClass, dataMap: Map<string, Identifier>) => {
  if (!classData.constructorData) return "";

  const constructorData = classData.constructorData;

  const params = constructorData.params || [];

  return `## Constructor
\`\`\`ts
new ${classData.name}(${params.map(param => param.name).join(", ")})
\`\`\`
${showParameters(constructorData.params, dataMap)}
`;
};
