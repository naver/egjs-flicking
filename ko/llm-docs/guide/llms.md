# LLMs.txt

This guide explains how to make Flicking's documentation available to AI tools (LLMs) so they generate more accurate Flicking code.

## What is LLMs.txt?

We support [llms.txt](https://llmstxt.org/) for making the Flicking documentation available to large language models (LLMs). This helps AI tools understand the library's options, events, plugins, and framework wrappers (React, Vue3), so the code they generate follows Flicking's real API and conventions.

Flicking exposes a single llms.txt file at:

**[https://naver.github.io/egjs-flicking/llms.txt](https://naver.github.io/egjs-flicking/llms.txt)**

It's a curated Markdown index — a short summary of the library plus links to the most useful guides, demos, options, and API pages, each pointing to a clean per-page `.md` file. An AI tool reads this index and fetches only the pages it needs, without wading through HTML, scripts, or styles.

## How to Use

Point your AI tool at the llms.txt URL. In any tool that can browse or fetch a URL, paste the following at the start of a chat — or add it to the tool's rules/memory file (`.cursor/rules`, `CLAUDE.md`, `.github/copilot-instructions.md`, etc.) so it applies to every request:

```
Read https://naver.github.io/egjs-flicking/llms.txt and use it as the reference
when writing code with @egjs/flicking (and @egjs/react-flicking / @egjs/vue3-flicking).
Follow the .md links it lists for API, options, events, and demos.
```

The AI then follows the links inside llms.txt to load the specific guides, options, and API pages relevant to your task.

### Example

For instance, to build a demo you can ask:

```
Using @egjs/react-flicking, create a circular image carousel that shows 3 panels
at once with center alignment and autoplay. Reference
https://naver.github.io/egjs-flicking/llms.txt for the correct options, component
structure, and plugin usage.
```

Guided by llms.txt, the AI picks the right options (`circular`, `panelsPerView`, `align`) and the `AutoPlay` plugin from `@egjs/flicking-plugins` — following Flicking's actual API instead of guessing.
