import Identifier from "../../types/identifier";
import { isInternal } from "../../utils";

export default (data: Identifier) => `### ${data.name} {#event-${data.name}}
${data.description ? data.description.replace(/\n/g, "<br/>") : ""}


${data.type ? `**Type**: ${data.type.names.join(" | ").replace(/</g, "&lt;").replace(/>/g, "&gt;")}` : ""}


${isInternal(data) ? ":::caution\n\nThis property is for internal use only\n\n:::" : "" }
`;
