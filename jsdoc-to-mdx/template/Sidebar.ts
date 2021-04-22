import Identifier from "../types/Identifier";

export default ({
  classes,
  interfaces,
  namespaces,
  constants
}: {
  classes: Identifier[];
  interfaces: Identifier[];
  namespaces: Identifier[];
  constants: Identifier[];
}) => {
  const sidebar: {[key: string]: any} = {};

  const categories: any[] = [];
  sidebar.api = categories;

  if (classes.length > 0) {
    categories.push({
      type: "category",
      label: "Class",
      items: classes.map(item => `api/${item.name}`)
    });
  }

  if (interfaces.length > 0) {
    categories.push({
      type: "category",
      label: "Interface",
      items: interfaces.map(item => `api/${item.name}`)
    });
  }

  if (namespaces.length > 0) {
    categories.push({
      type: "category",
      label: "Namespace",
      items: namespaces.map(item => `api/${item.name}`)
    });
  }

  if (constants.length > 0) {
    categories.push({
      type: "category",
      label: "Constant",
      items: constants.map(item => `api/${item.name}`)
    });
  }

  return `module.exports = ${JSON.stringify(sidebar, undefined, 2)};\n`;
};
