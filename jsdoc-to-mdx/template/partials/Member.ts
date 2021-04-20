import Identifier from "../../types/identifier";
import { inlineLink, showDefault, showExample, showInternalWarning, showParameters, showReturn, showSee, showTags, showThrows, showType } from "../../utils";

export default (data: Identifier, dataMap: Map<string, Identifier>) => `### ${data.name} {#${data.kind === "event" ? `event-${data.name}` : data.name}}
${showTags(data)}

${inlineLink(data.description)}

${showType(data.type, dataMap)}
${showDefault(data.defaultvalue, dataMap)}
${showReturn(data.returns, dataMap)}

${showParameters(data.params, dataMap)}

${showThrows(data.exceptions, dataMap)}
${showSee(data.see, dataMap)}
${showExample(data)}

${showInternalWarning(data)}
`;
