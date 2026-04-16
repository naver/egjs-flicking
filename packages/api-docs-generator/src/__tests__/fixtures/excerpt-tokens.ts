/**
 * Test fixture data containing various excerptTokens patterns
 * Extracted from real flicking.api.json
 */

export const sampleExcerptTokens = {
  // Simple type: HTMLElement
  simpleReference: [
    {
      kind: "Content",
      text: "get element(): "
    },
    {
      kind: "Reference",
      text: "HTMLElement",
      canonicalReference: "!HTMLElement:interface"
    },
    {
      kind: "Content",
      text: ";"
    }
  ],

  // Union type: AnchorPoint | null
  unionType: [
    {
      kind: "Content",
      text: "findActiveAnchor(): "
    },
    {
      kind: "Reference",
      text: "AnchorPoint",
      canonicalReference: "@egjs/flicking!AnchorPoint:class"
    },
    {
      kind: "Content",
      text: " | null"
    },
    {
      kind: "Content",
      text: ";"
    }
  ],

  // With parameter: (position: number): AnchorPoint | null
  withParameter: [
    {
      kind: "Content",
      text: "findAnchorIncludePosition(position: "
    },
    {
      kind: "Content",
      text: "number"
    },
    {
      kind: "Content",
      text: "): "
    },
    {
      kind: "Reference",
      text: "AnchorPoint",
      canonicalReference: "@egjs/flicking!AnchorPoint:class"
    },
    {
      kind: "Content",
      text: " | null"
    },
    {
      kind: "Content",
      text: ";"
    }
  ],

  // Complex type: ValueOf<typeof ORDER>
  complexType: [
    {
      kind: "Content",
      text: "get panelOrder(): "
    },
    {
      kind: "Reference",
      text: "ValueOf",
      canonicalReference: "@egjs/flicking!~ValueOf:type"
    },
    {
      kind: "Content",
      text: "<typeof "
    },
    {
      kind: "Reference",
      text: "ORDER",
      canonicalReference: "@egjs/flicking!ORDER:var"
    },
    {
      kind: "Content",
      text: ">"
    },
    {
      kind: "Content",
      text: ";"
    }
  ]
};
