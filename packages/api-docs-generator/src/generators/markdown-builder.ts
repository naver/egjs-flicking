/**
 * Helper class to build markdown content
 */
export class MarkdownBuilder {
  private lines: string[] = [];

  heading(level: number, text: string): this {
    this.lines.push(`${"#".repeat(level)} ${text}`);
    this.lines.push("");
    return this;
  }

  paragraph(text: string): this {
    this.lines.push(text);
    this.lines.push("");
    return this;
  }

  blockquote(text: string): this {
    this.lines.push(`> ${text}`);
    this.lines.push("");
    return this;
  }

  codeBlock(code: string, language = ""): this {
    this.lines.push(`\`\`\`${language}`);
    this.lines.push(code);
    this.lines.push("```");
    this.lines.push("");
    return this;
  }

  list(items: string[], ordered = false): this {
    items.forEach((item, index) => {
      const prefix = ordered ? `${index + 1}.` : "-";
      this.lines.push(`${prefix} ${item}`);
    });
    this.lines.push("");
    return this;
  }

  table(headers: string[], rows: string[][]): this {
    // Header row
    this.lines.push(`| ${headers.join(" | ")} |`);
    // Separator row
    this.lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
    // Data rows
    rows.forEach(row => {
      this.lines.push(`| ${row.join(" | ")} |`);
    });
    this.lines.push("");
    return this;
  }

  horizontalRule(): this {
    this.lines.push("---");
    this.lines.push("");
    return this;
  }

  link(text: string, url: string): string {
    return `[${text}](${url})`;
  }

  inlineCode(text: string): string {
    return `\`${text}\``;
  }

  bold(text: string): string {
    return `**${text}**`;
  }

  italic(text: string): string {
    return `*${text}*`;
  }

  raw(text: string): this {
    this.lines.push(text);
    return this;
  }

  newline(): this {
    this.lines.push("");
    return this;
  }

  /**
   * Start a div wrapper with a semantic class name
   * MDX requires className instead of class
   */
  divStart(className: string): this {
    this.lines.push(`<div className="${className}">`);
    this.lines.push("");
    return this;
  }

  /**
   * End a div wrapper
   */
  divEnd(): this {
    this.lines.push("");
    this.lines.push("</div>");
    this.lines.push("");
    return this;
  }

  build(): string {
    return this.lines.join("\n");
  }
}
