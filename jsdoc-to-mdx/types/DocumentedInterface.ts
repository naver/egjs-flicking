import Identifier from "./Identifier";

interface DocumentedInterface extends Identifier {
  properties: Required<Identifier["properties"]>;
}

export default DocumentedInterface;
