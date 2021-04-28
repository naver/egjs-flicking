/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable arrow-body-style */
import DocumentedClass from "./types/DocumentedClass";
import Identifier from "./types/Identifier";

export const isStatic = (data: Identifier) => data.scope && data.scope === "static";
export const isReadonly = (data: Identifier) => !!data.readonly;
export const isInternal = (data: Identifier) => data.customTags && data.customTags.some(val => val.tag === "internal");
export const isInherited = (data: Identifier) => !!data.inherited && data.inherits;
export const isAsync = (data: Identifier) => !!data.async;

export const getDescription = (data: { description?: string; [key: string]: any }, locale: string) => data.description
  ? data[locale]
    ? data[locale] as string
    : data.description
  : "";

export const parseTypescriptName = (name: string) => {
  const matched = /^\$ts:(.+)(?:<file>(?:.+)<\/file>)$/.exec(name);

  if (!matched) return name;

  return matched[1] ?? name;
};
export const parseType = (type: Required<Identifier>["type"], dataMap: Map<string, Identifier>) => {
  const genericRegex = /^(?:(\S+)<)([^<>]+)+(?:>)$/;
  const arrayRegex = /^(\S+)\[\]$/;

  return type.names
    .map(name => parseTypescriptName(name))
    .map(name => {
      const checkingValues = [name];

      const genericMatches = genericRegex.exec(name);
      if (genericMatches) {
        genericMatches[1] && checkingValues.push(genericMatches[1]);
        genericMatches[2] && checkingValues.push(genericMatches[2]);
      }

      const arrayMatches = arrayRegex.exec(name);
      if (arrayMatches) {
        arrayMatches[1] && checkingValues.push(arrayMatches[1]);
      }

      const checked: {[key: string]: boolean} = {};

      checkingValues.forEach(typeName => {
        typeName.split("|")
          .map(val => val.split("&"))
          .reduce((total, val) => [...total, ...val], [])
          .map(val => val.trim())
          .forEach(val => {
            if (dataMap.has(val) && !checked[val]) {
              checked[val] = true;
              name = name.replace(val, `[${val}](${val.replace(/event:/g, "event-").replace(/\./g, ":")})`);
            }
          });
      });

      return name;
    })
    .join(" | ")
    .replace(/\|/g, "\\|")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/Array\./g, "Array");
};
export const parseName = (name: string) => {
  const parsed = /(?:\S):(?:\S)[.|#](\S)+/.exec(name);
  return parsed ? (parsed.groups![0] ?? name) : name;
};
export const parseURL = (url: string) => {
  return url;
};
export const parseLink = (text?: string) => {
  // Code from dmd/ddata (https://github.com/jsdoc2md/dmd/blob/master/helpers/ddata.js#L616)
  if (!text) return [];

  const results: Array<{
    original: string;
    caption: string;
    url: string;
  }> = [];
  let matches: RegExpExecArray | null = null;
  const link1 = /{@link\s+([^\s}|]+?)\s*}/g; // {@link someSymbol}
  const link2 = /\[([^\]]+?)\]{@link\s+([^\s}|]+?)\s*}/g; // [caption here]{@link someSymbol}
  const link3 = /{@link\s+([^\s}|]+?)\s*\|([^}]+?)}/g; // {@link someSymbol|caption here}
  const link4 = /{@link\s+([^\s}|]+?)\s+([^}|]+?)}/g; // {@link someSymbol Caption Here}

  while ((matches = link4.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[2],
      url: matches[1]
    });
    text = text.replace(matches[0], " ".repeat(matches[0].length));
  }

  while ((matches = link3.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[2],
      url: matches[1]
    });
    text = text.replace(matches[0], " ".repeat(matches[0].length));
  }

  while ((matches = link2.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[1],
      url: matches[2]
    });
    text = text.replace(matches[0], " ".repeat(matches[0].length));
  }

  while ((matches = link1.exec(text)) !== null) {
    results.push({
      original: matches[0],
      caption: matches[1],
      url: matches[1]
    });
    text = text.replace(matches[0], " ".repeat(matches[0].length));
  }

  results.map(result => {
    result.url = result.url.replace(/event:/g, "event-").replace(/\./g, "#");
    return result;
  });

  return results;
};
export const inlineLink = (text?: string) => {
  if (!text) return "";

  const results = parseLink(text);

  results.forEach(result => {
    text = text!.replace(result.original, `[${result.caption}](${result.url})`);
  });

  return text;
};

// Add locales to object if the object description has locales in it
export const parseLocales = (obj: { description: string }, locale: string) => {
  const localeRegex = new RegExp(`<${locale}>(.+)<\/${locale}>`, "s");
  const result = localeRegex.exec(obj.description);

  if (result) {
    obj.description = obj.description.replace(localeRegex, "").trim();
    obj[locale] = result[1];
  }
};

export const hashLink = (name: string, id: string) => `<a href="#${id}">${name}</a>`;

export const showExtends = (classData: DocumentedClass) => classData.augments && classData.augments.length > 0
  ? ` extends ${classData.augments.map(name => parseTypescriptName(name)).join(", ")}`
  : "";
export const showImplements = (data: Identifier) => data.implements && data.implements.length > 0
  ? ` implements ${data.implements.map(name => parseTypescriptName(name)).join(", ")}`
  : "";

export const showTags = (data: Identifier) => `<div className="bulma-tags">
${isStatic(data) ? "<span className=\"bulma-tag is-info\">static</span>" : ""}
${isReadonly(data) ? "<span className=\"bulma-tag is-warning\">readonly</span>" : ""}
${isInherited(data) ? "<span className=\"bulma-tag is-danger\">inherited</span>" : ""}
${isAsync(data) ? "<span className=\"bulma-tag is-success\">async</span>" : ""}
</div>`;

export const showType = (type: Identifier["type"], dataMap: Map<string, Identifier>) => type
  ? `**Type**: ${parseType(type, dataMap)}`
  : "";

export const showDefault = (defaultVal: Identifier["defaultvalue"], dataMap: Map<string, Identifier>) => defaultVal
  ? `**Default**: ${parseType({ names: [defaultVal] }, dataMap)}`
  : "";

export const showReturn = (returns: Identifier["returns"], dataMap: Map<string, Identifier>, locale: string) => returns && returns.length > 0
  ? `**Returns**: ${returns.filter(val => !!val.type).map(({ type }) => parseType(type!, dataMap))}
${returns.map(val => val.description ? `- ${inlineLink(getDescription(val, locale))}` : "").join("\n")}`
  : "";

export const showEmit = (emits: Identifier["fires"], dataMap: Map<string, Identifier>) => emits && emits.length > 0
  ? `**Emits**: ${emits.map(emit => parseType({ names: [emit] }, dataMap)).join(", ")}`
  : "";

export const showParameters = (params: Identifier["params"], dataMap: Map<string, Identifier>, locale: string) => params && params.length > 0
  ? `|PARAMETER|TYPE|OPTIONAL|DEFAULT|DESCRIPTION|
|:---:|:---:|:---:|:---:|:---:|
${params.map(param => `|${param.name}|${parseType(param.type, dataMap)}|${param.optional ? "yes" : "no"}|${inlineLink(param.defaultvalue)}|${inlineLink(getDescription(param, locale))}|`).join("\n")}`
  : "";

export const showProperties = (properties: Identifier["properties"], dataMap: Map<string, Identifier>, locale: string) => properties && properties.length > 0
  ? `|PROPERTY|TYPE|DESCRIPTION|
|:---:|:---:|:---:|
${properties.map(param => `|${param.name}|${parseType(param.type, dataMap)}|${inlineLink(getDescription(param, locale))}|`).join("\n")}`
  : "";

export const showThrows = (throws: Identifier["exceptions"], dataMap: Map<string, Identifier>, locale: string) => throws && throws.length > 0
  ? `${throws.map(exception => `**Throws**: ${parseType(exception.type, dataMap)}\n\n${inlineLink(getDescription(exception, locale))}`).join("\n")}`
  : "";

export const showSee = (see: Identifier["see"], dataMap: Map<string, Identifier>, locale: string) => see
  ? `**See**:
${see.map(val => parseType({ names: [getDescription(val, locale)] }, dataMap)).map(link => `- ${inlineLink(link)}`).join("\n")}`
  : "";

export const showExample = (data: Identifier, lang = "ts") => data.examples
  ? data.examples.map(example => example.trim().startsWith("```") ? example : `\`\`\`${lang}\n${example}\n\`\`\``).join("\n\n")
  : "";

export const showInternalWarning = (data: Identifier) => isInternal(data) ? `<div className="notification is-warning my-2">⚠️ This ${data.kind} is for <strong>internal</strong> use only.</div>` : "";
