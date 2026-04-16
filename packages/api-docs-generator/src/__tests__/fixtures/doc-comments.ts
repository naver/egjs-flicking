/**
 * Test fixture data containing various TSDoc patterns
 * Extracted from real flicking.api.json
 */

export const sampleDocComments = {
  // Simple summary only
  simple: `/**\n * The camera element(\`.flicking-camera\`)\n *\n * @readonly\n */\n`,

  // With @remarks
  withRemarks: `/**\n * Return {@link AnchorPoint} that includes given position\n *\n * @remarks\n *\n * If there's no {@link AnchorPoint} that includes the given position, return \`null\` instead\n *\n * @param position - A position to check\n *\n * @returns The {@link AnchorPoint} that includes the given position\n */\n`,

  // With @param and @returns
  withParamAndReturns: `/**\n * Move to the given position and apply CSS transform\n *\n * @param pos - A new position\n *\n * @throws\n *\n * {FlickingError} {@link ERROR_CODE NOT_ATTACHED_TO_FLICKING} When {@link Camera#init init} is not called before\n */\n`,

  // With @defaultValue
  withDefaultValue: `/**\n * Position offset, used for the {@link Flicking#renderOnlyVisible renderOnlyVisible} option\n *\n * @defaultValue 0\n *\n * @readonly\n */\n`,

  // With @throws
  withThrows: `/**\n * Initialize Camera\n *\n * @returns The current instance for method chaining\n *\n * @throws\n *\n * {FlickingError} {@link ERROR_CODE VAL_MUST_NOT_NULL} If the camera element(\`.flicking-camera\`) does not exist inside viewport element\n */\n`,

  // Complex with multiple tags
  complex: `/**\n * Return the camera's position progress in the panel below\n *\n * @remarks\n *\n * Value is from 0 to 1 when the camera's inside panel. Value can be lower than 0 or bigger than 1 when it's in the margin area\n *\n * @param panel - A panel to check\n *\n * @returns Progress value from 0 to 1 (or outside this range when in margin area)\n */\n`,

  // With @example
  withExample: `/**\n * Connect Flicking instance to reactive API\n *\n * @param flicking - Flicking instance to connect\n *\n * @param options - Flicking options\n *\n * @returns Reactive object with Flicking state and methods\n *\n * @example\n * \`\`\`js\n * import Flicking from "@egjs/flicking";\n *\n * const flicking = new Flicking("#el");\n * const reactiveObj = connectFlickingReactiveAPI(flicking);\n *\n * console.log("Current panel:", reactiveObj.currentPanelIndex);\n * \`\`\`\n *\n */\n`,

  // With @see
  withSee: `/**\n * Some description\n *\n * @see {@link Flicking}\n *\n * @see {@link Panel}\n */\n`,

  // With @deprecated
  withDeprecated: `/**\n * Old function that should not be used\n *\n * @deprecated Use newFunction instead\n */\n`
};
