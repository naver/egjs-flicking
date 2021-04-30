import Identifier from "../types/Identifier";
import { getDescription, inlineLink, showType } from "../utils";

import Import from "./partials/Import";

export default (typedefData: Identifier, dataMap: Map<string, Identifier>, locale: string = "en"): string => `${Import()}

${typedefData.longname, inlineLink(getDescription(typedefData, locale))}

${showType(typedefData.type, dataMap)}
`;
