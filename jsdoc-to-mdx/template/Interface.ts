import DocumentedInterface from "../types/DocumentedInterface";
import Identifier from "../types/Identifier";
import { inlineLink } from "../utils";

import Import from "./partials/Import";

export default (interfaceData: DocumentedInterface, dataMap: Map<string, Identifier>): string => `${Import()}
\`\`\`ts
interface ${interfaceData.name}
\`\`\`
${inlineLink(interfaceData.description)}
`;
