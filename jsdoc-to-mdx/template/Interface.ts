import DocumentedInterface from "../types/DocumentedInterface";
import Identifier from "../types/Identifier";
import { getDescription, inlineLink, showProperties } from "../utils";

import Import from "./partials/Import";

export default (interfaceData: DocumentedInterface, dataMap: Map<string, Identifier>, locale: string = "en"): string => `${Import()}

\`\`\`ts
interface ${interfaceData.name}
\`\`\`

${inlineLink(getDescription(interfaceData, locale))}

${showProperties(interfaceData.properties, dataMap, locale)}
`;
