import Identifier from "../types/Identifier";
import { getDescription, inlineLink, showProperties } from "../utils";

import Import from "./partials/Import";

export default (constantData: Identifier, dataMap: Map<string, Identifier>, locale: string = "en"): string => `${Import()}

${constantData.longname, inlineLink(getDescription(constantData, locale))}

${showProperties(constantData.properties, dataMap, locale)}
`;
