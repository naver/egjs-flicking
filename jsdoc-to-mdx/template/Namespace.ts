import DocumentedNamespace from "../types/DocumentedNamespace";
import Identifier from "../types/Identifier";
import { inlineLink } from "../utils";

import Import from "./partials/Import";
import Member from "./partials/Member";

export default (namespaceData: DocumentedNamespace, dataMap: Map<string, Identifier>): string => `${Import()}
${inlineLink(namespaceData.description)}

## Members
${namespaceData.members.map(member => Member(member, dataMap)).join("\n")}
`;
