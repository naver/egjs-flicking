import DocumentedClass from "../../types/class";

export default (classData: DocumentedClass) => {
  if (!classData.constructorData) return "";

  const constructorData = classData.constructorData;

  const params = constructorData.params || [];

  return `## Constructor
### new ${classData.name}(${params.map(param => param.name).join(", ")})
`;
};
