interface Type {
  names: string[];
}

interface Identifier {
  sort?: number;
  id: string;
  longname: string;
  name: string;
  kind: "constructor" | "interface" | "class" | "function" | "constant" | "typedef" | "event" | "member" | "namespace";
  order: number;
  // "global", "instance", "static"
  scope?: string;
  description?: string;
  filename?: string;
  meta?: {
    lineno: number;
    filename: string;
    path: string;
  };
  returns?: Array<{
    type: Type;
  }>;
  type?: Type;
  readonly?: boolean;
  defaultvalue?: string;
  overrides?: string;
  see?: string[];
  virtual?: boolean;
  async?: boolean;
  params?: Array<{
    type: Type;
    name: string;
    description: string;
    optional?: boolean;
    defaultvalue?: string;
  }>;
  properties?: Array<{
    type: Type;
    description: string;
    name: string;
  }>;
  inherits?: string;
  inherited?: boolean;
  chainable?: boolean;
  memberof?: string;
  examples?: string[];
  // "public", "protected", "private"
  access?: string;
  // Throws
  exceptions?: Array<{
    type: Type;
    desription: string;
  }>;
  // Inherits
  augments?: string[];
  fires?: string[];
  requires?: string[];
  implements?: string[];
  support?: {[browser: string]: string};
  // Custom tags, like @internal
  customTags?: Array<{
    tag: string;
  }>;
}

export default Identifier;
