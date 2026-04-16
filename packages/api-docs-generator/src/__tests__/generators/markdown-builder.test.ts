import { describe, expect, it } from "vitest";
import { MarkdownBuilder } from "../../generators/markdown-builder";

describe("MarkdownBuilder", () => {
  describe("heading", () => {
    it("should create h1 heading", () => {
      const md = new MarkdownBuilder();
      md.heading(1, "Title");
      expect(md.build()).toBe("# Title\n");
    });

    it("should create h2 heading", () => {
      const md = new MarkdownBuilder();
      md.heading(2, "Subtitle");
      expect(md.build()).toBe("## Subtitle\n");
    });

    it("should create h3 heading", () => {
      const md = new MarkdownBuilder();
      md.heading(3, "Section");
      expect(md.build()).toBe("### Section\n");
    });

    it("should support method chaining", () => {
      const md = new MarkdownBuilder();
      const result = md.heading(1, "Title");
      expect(result).toBe(md);
    });
  });

  describe("paragraph", () => {
    it("should create paragraph", () => {
      const md = new MarkdownBuilder();
      md.paragraph("Some text");
      expect(md.build()).toBe("Some text\n");
    });

    it("should support method chaining", () => {
      const md = new MarkdownBuilder();
      const result = md.paragraph("Text");
      expect(result).toBe(md);
    });
  });

  describe("blockquote", () => {
    it("should create blockquote", () => {
      const md = new MarkdownBuilder();
      md.blockquote("Quoted text");
      expect(md.build()).toBe("> Quoted text\n");
    });
  });

  describe("codeBlock", () => {
    it("should create code block without language", () => {
      const md = new MarkdownBuilder();
      md.codeBlock("const x = 1;");
      expect(md.build()).toBe("```\nconst x = 1;\n```\n");
    });

    it("should create code block with language", () => {
      const md = new MarkdownBuilder();
      md.codeBlock("const x = 1;", "typescript");
      expect(md.build()).toBe("```typescript\nconst x = 1;\n```\n");
    });

    it("should preserve code indentation", () => {
      const md = new MarkdownBuilder();
      const code = "function test() {\n  return 1;\n}";
      md.codeBlock(code, "javascript");
      expect(md.build()).toContain(code);
    });
  });

  describe("list", () => {
    it("should create unordered list", () => {
      const md = new MarkdownBuilder();
      md.list(["Item 1", "Item 2", "Item 3"]);
      expect(md.build()).toBe("- Item 1\n- Item 2\n- Item 3\n");
    });

    it("should create ordered list", () => {
      const md = new MarkdownBuilder();
      md.list(["First", "Second", "Third"], true);
      expect(md.build()).toBe("1. First\n2. Second\n3. Third\n");
    });

    it("should handle empty list", () => {
      const md = new MarkdownBuilder();
      md.list([]);
      // Empty list produces just a trailing newline (empty line added after items)
      expect(md.build()).toBe("");
    });
  });

  describe("table", () => {
    it("should create table with headers and rows", () => {
      const md = new MarkdownBuilder();
      md.table(
        ["Name", "Type"],
        [
          ["foo", "string"],
          ["bar", "number"]
        ]
      );
      const output = md.build();

      expect(output).toContain("| Name | Type |");
      expect(output).toContain("| --- | --- |");
      expect(output).toContain("| foo | string |");
      expect(output).toContain("| bar | number |");
    });

    it("should handle single column table", () => {
      const md = new MarkdownBuilder();
      md.table(["Item"], [["A"], ["B"]]);
      const output = md.build();

      expect(output).toContain("| Item |");
      expect(output).toContain("| --- |");
    });
  });

  describe("horizontalRule", () => {
    it("should create horizontal rule", () => {
      const md = new MarkdownBuilder();
      md.horizontalRule();
      expect(md.build()).toBe("---\n");
    });
  });

  describe("inline formatting methods", () => {
    describe("link", () => {
      it("should create markdown link", () => {
        const md = new MarkdownBuilder();
        expect(md.link("Click here", "https://example.com")).toBe("[Click here](https://example.com)");
      });

      it("should handle special characters in text", () => {
        const md = new MarkdownBuilder();
        expect(md.link("Test [link]", "/path")).toBe("[Test [link]](/path)");
      });
    });

    describe("inlineCode", () => {
      it("should wrap text in backticks", () => {
        const md = new MarkdownBuilder();
        expect(md.inlineCode("const x")).toBe("`const x`");
      });
    });

    describe("bold", () => {
      it("should wrap text in double asterisks", () => {
        const md = new MarkdownBuilder();
        expect(md.bold("important")).toBe("**important**");
      });
    });

    describe("italic", () => {
      it("should wrap text in single asterisks", () => {
        const md = new MarkdownBuilder();
        expect(md.italic("emphasis")).toBe("*emphasis*");
      });
    });
  });

  describe("raw", () => {
    it("should add raw text without blank line", () => {
      const md = new MarkdownBuilder();
      md.raw("raw line 1");
      md.raw("raw line 2");
      expect(md.build()).toBe("raw line 1\nraw line 2");
    });
  });

  describe("newline", () => {
    it("should add empty line", () => {
      const md = new MarkdownBuilder();
      md.raw("line 1");
      md.newline();
      md.raw("line 2");
      expect(md.build()).toBe("line 1\n\nline 2");
    });
  });

  describe("build", () => {
    it("should combine all elements", () => {
      const md = new MarkdownBuilder();
      md.heading(1, "Title").paragraph("Description").codeBlock("const x = 1;", "typescript");

      const output = md.build();
      expect(output).toContain("# Title");
      expect(output).toContain("Description");
      expect(output).toContain("```typescript");
    });

    it("should return empty string for empty builder", () => {
      const md = new MarkdownBuilder();
      expect(md.build()).toBe("");
    });
  });

  describe("complex document", () => {
    it("should build a complete markdown document", () => {
      const md = new MarkdownBuilder();
      md.heading(1, "API Documentation")
        .blockquote("A powerful library")
        .heading(2, "Installation")
        .codeBlock("npm install @egjs/flicking", "bash")
        .heading(2, "Parameters")
        .table(
          ["Name", "Type", "Description"],
          [
            ["element", "HTMLElement", "The container element"],
            ["options", "FlickingOptions", "Configuration options"]
          ]
        )
        .horizontalRule()
        .paragraph(`${md.bold("Note:")} This is ${md.italic("important")}.`);

      const output = md.build();

      expect(output).toContain("# API Documentation");
      expect(output).toContain("> A powerful library");
      expect(output).toContain("## Installation");
      expect(output).toContain("```bash");
      expect(output).toContain("npm install @egjs/flicking");
      expect(output).toContain("| element | HTMLElement |");
      expect(output).toContain("---");
      expect(output).toContain("**Note:**");
      expect(output).toContain("*important*");
    });
  });
});
