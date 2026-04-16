/**
 * Docusaurus frontmatter utilities
 */

export interface FrontmatterOptions {
  sidebarLabel?: string;
  sidebarPosition?: number;
  title?: string;
}

/**
 * Add YAML frontmatter to markdown content
 */
export function addFrontmatter(markdown: string, options: FrontmatterOptions): string {
  const lines: string[] = ["---"];

  if (options.title) {
    lines.push(`title: "${options.title}"`);
  }
  if (options.sidebarLabel) {
    lines.push(`sidebar_label: "${options.sidebarLabel}"`);
  }
  if (options.sidebarPosition !== undefined) {
    lines.push(`sidebar_position: ${options.sidebarPosition}`);
  }

  lines.push("---");
  lines.push("");

  return lines.join("\n") + markdown;
}
