import Identifier from "./identifier";

interface DocumentedClass extends Identifier {
  constructorData?: Identifier;
  static: {
    members: Identifier[];
    methods: Identifier[];
  };
  members: Identifier[];
  methods: Identifier[];
  events: Identifier[];
}

export default DocumentedClass;
