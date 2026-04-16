/**
 * Pure data structures for extracted documentation content.
 * These types contain raw extracted data without any rendering logic.
 */

/**
 * Represents a reference found in documentation (e.g., {@link Flicking.init})
 */
export interface DocReference {
  /** The raw text that appeared in the link tag */
  text: string;
  /** URL destination if it's an external link */
  urlDestination?: string;
  /** Member reference identifiers (e.g., ["Flicking", "init"]) */
  memberIdentifiers?: string[];
  /** Link text override if provided */
  linkText?: string;
}

/**
 * Parameter information extracted from @param tags
 */
export interface ExtractedParam {
  name: string;
  description: string;
  references: DocReference[];
}

/**
 * Complete documentation extracted from a TSDoc comment.
 * This is a pure data structure with no rendering logic.
 */
export interface ExtractedDocComment {
  /** Summary section content */
  summary: string;
  /** Summary section references */
  summaryReferences: DocReference[];

  /** Remarks section content (null if not present) */
  remarks: string | null;
  /** Remarks section references */
  remarksReferences: DocReference[];

  /** Parameters from @param tags */
  params: ExtractedParam[];

  /** Returns description from @returns tag */
  returns: string | null;
  /** Returns section references */
  returnsReferences: DocReference[];

  /** Default value from @defaultValue tag */
  defaultValue: string | null;

  /** Deprecation message from @deprecated tag */
  deprecated: string | null;

  /** Throws descriptions from @throws tags */
  throws: ThrowsEntry[];

  /** Example code blocks from @example tags */
  examples: string[];

  /** Event names from @fires tags (custom tag) */
  fires: FiresEntry[];

  /** See also references from @see tags */
  seeAlso: SeeAlsoEntry[];

  /** Accepted constant values from @accepts tags */
  accepts: AcceptsEntry[];

  /** Dependencies from @dependency tags */
  dependencies: DependencyEntry[];

  /** Version when this API was introduced, from @since tag */
  since: string | null;
}

/**
 * Throws entry from @throws tag
 */
export interface ThrowsEntry {
  text: string;
  references: DocReference[];
}

/**
 * Fires entry from @fires tag
 */
export interface FiresEntry {
  text: string;
  references: DocReference[];
}

/**
 * See also entry with potential URL or API reference
 */
export interface SeeAlsoEntry {
  text: string;
  references: DocReference[];
}

/**
 * Accepts entry from @accepts tag.
 * Links an option to the constant that defines its valid values.
 */
export interface AcceptsEntry {
  text: string;
  references: DocReference[];
}

/**
 * Dependency entry from @dependency tag
 */
export interface DependencyEntry {
  /** Dependency type (Conditional, Mutual Exclusive, Related, Requires) */
  type: string;
  /** Dependency description */
  description: string;
  /** References to related options */
  references: DocReference[];
}

/**
 * Creates an empty ExtractedDocComment
 */
export function createEmptyExtractedDoc(): ExtractedDocComment {
  return {
    summary: "",
    summaryReferences: [],
    remarks: null,
    remarksReferences: [],
    params: [],
    returns: null,
    returnsReferences: [],
    defaultValue: null,
    deprecated: null,
    throws: [],
    examples: [],
    fires: [],
    accepts: [],
    seeAlso: [],
    dependencies: [],
    since: null
  };
}
