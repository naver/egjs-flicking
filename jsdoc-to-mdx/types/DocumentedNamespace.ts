import Identifier from "./Identifier";

interface DocumentedNamespace extends Identifier {
  members: Identifier[];
}

export default DocumentedNamespace;
