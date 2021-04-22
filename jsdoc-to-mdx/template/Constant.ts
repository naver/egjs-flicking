import Identifier from "../types/Identifier";
import { inlineLink } from "../utils";

import Import from "./partials/Import";

export default (constantData: Identifier, dataMap: Map<string, Identifier>): string => `${Import()}
${inlineLink(constantData.description)}
`;
