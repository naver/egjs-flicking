import Identifier from "../../types/Identifier";
import { getDescription, inlineLink, showDefault, showEmit, showExample, showInternalWarning, showParameters, showProperties, showReturn, showSee, showTags, showThrows, showType } from "../../utils";

export default (data: Identifier, dataMap: Map<string, Identifier>, locale: string) => `### ${data.name} {#${data.kind === "event" ? `event-${data.name}` : data.name}}

${showTags(data)}

${inlineLink(getDescription(data, locale))}

${showType(data.type, dataMap)}

${showDefault(data.defaultvalue, dataMap)}

${showReturn(data.returns, dataMap, locale)}

${showEmit(data.fires, dataMap)}

${showParameters(data.params, dataMap, locale)}
${showProperties(data.properties, dataMap, locale)}

${showThrows(data.exceptions, dataMap, locale)}
${showSee(data.see, dataMap, locale)}
${showExample(data)}

${showInternalWarning(data)}
`;
