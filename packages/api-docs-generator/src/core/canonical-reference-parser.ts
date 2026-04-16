/**
 * Parser for API Extractor canonical references.
 *
 * Canonical reference format examples:
 * - Top-level item: "@egjs/flicking!Flicking:class"
 * - Member: "@egjs/flicking!Flicking#addPlugins:member(1)"
 * - Interface: "@egjs/flicking!FlickingOptions:interface"
 *
 * This class parses the reference once and provides structured access to its components.
 */
export class CanonicalReferenceParser {
  private readonly _canonicalReference: string;
  private readonly _kind: string | null;
  private readonly _name: string | null;
  private readonly _memberName: string | null;
  private readonly _isValid: boolean;

  constructor(canonicalReference: string) {
    this._canonicalReference = canonicalReference;

    // Parse kind (e.g., "class", "interface", "member")
    const kindMatch = canonicalReference.match(/:(\w+)(?:\(\d+\))?$/);
    this._kind = kindMatch ? kindMatch[1] : null;

    // Parse name (container or item name)
    if (canonicalReference.includes("#")) {
      // Member reference: extract container name
      const nameMatch = canonicalReference.match(/!~?([^#:]+)#/);
      this._name = nameMatch ? nameMatch[1] : null;
    } else {
      // Top-level reference: extract item name
      const nameMatch = canonicalReference.match(/!~?([^:]+):(\w+)/);
      this._name = nameMatch ? nameMatch[1] : null;
    }

    // Parse member name (if this is a member reference)
    if (canonicalReference.includes("#")) {
      const memberMatch = canonicalReference.match(/#([^:]+):/);
      this._memberName = memberMatch ? memberMatch[1] : null;
    } else {
      this._memberName = null;
    }

    // Validate: a valid reference has at least a kind and a name
    this._isValid = this._kind !== null && this._name !== null;
  }

  /**
   * Get the kind of the API item (e.g., "class", "interface", "member")
   */
  get kind(): string | null {
    return this._kind;
  }

  /**
   * Get the name of the API item or its container (for members)
   */
  get name(): string | null {
    return this._name;
  }

  /**
   * Get the member name (if this is a member reference)
   */
  get memberName(): string | null {
    return this._memberName;
  }

  /**
   * Check if this is a valid canonical reference
   */
  get isValid(): boolean {
    return this._isValid;
  }

  /**
   * Check if this is a member reference (has a member name)
   */
  get isMember(): boolean {
    return this._memberName !== null;
  }

  /**
   * Get the original canonical reference string
   */
  get canonicalReference(): string {
    return this._canonicalReference;
  }
}
