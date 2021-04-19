import Identifier from "./identifier";

interface DocumentedInterface extends Identifier {
  properties: Required<Identifier["properties"]>;
}

export default DocumentedInterface;
