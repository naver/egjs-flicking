/**
 * Docusaurus sidebar generator
 */

export interface GeneratedFile {
  name: string;
  category: "classes" | "interfaces" | "functions" | "variables" | "types";
}

interface SidebarCategory {
  type: "category";
  label: string;
  collapsed: boolean;
  items: (string | SidebarCategory)[];
}

interface SidebarConfig {
  api: SidebarCategory[];
}

/** Featured items that appear in Essentials category */
const FEATURED_ITEMS = ["Flicking", "FlickingOptions", "FlickingErrors", "FlickingEvents"];

/** Essential interfaces that appear in Essentials category */
const ESSENTIAL_INTERFACES: string[] = [];

/** Plugin class items */
const PLUGIN_ITEMS = ["AutoPlay", "Arrow", "Fade", "Parallax", "Perspective", "Sync", "Pagination"];

/** Top-level category labels */
const ESSENTIALS_LABEL = "Essentials";
const INTERNALS_LABEL = "Internals";

/** Internals sub-category configuration */
const INTERNALS_CATEGORIES: Record<string, { label: string; dir: string }> = {
  classes: { label: "Classes", dir: "classes" },
  interfaces: { label: "Interfaces", dir: "interfaces" },
  functions: { label: "Functions", dir: "functions" },
  variables: { label: "Constants", dir: "variables" },
  types: { label: "Types", dir: "types" }
};

/**
 * Generate sidebars-api.js content
 */
export function generateSidebarFile(files: GeneratedFile[]): string {
  const sidebar = buildSidebarConfig(files);
  return `module.exports = ${JSON.stringify(sidebar, null, 2)};\n`;
}

/**
 * Build sidebar configuration object
 */
function buildSidebarConfig(files: GeneratedFile[]): SidebarConfig {
  const filesByCategory = groupByCategory(files);

  // Essentials category (featured items + essential interfaces, always expanded)
  const essentialsItems: (string | SidebarCategory)[] = [];

  // Add featured items with correct category paths
  for (const name of FEATURED_ITEMS) {
    const file = files.find(f => f.name === name);
    if (file) {
      const dir = INTERNALS_CATEGORIES[file.category]?.dir || file.category;
      essentialsItems.push(`api/${dir}/${name}`);
    }
  }

  // Add essential interfaces
  for (const name of ESSENTIAL_INTERFACES) {
    essentialsItems.push(`api/interfaces/${name}`);
  }

  // Build Plugins sub-category inside Essentials (classes only, not options)
  const pluginsItems: string[] = [];
  for (const name of PLUGIN_ITEMS) {
    const file = files.find(f => f.name === name);
    if (file) {
      const dir = INTERNALS_CATEGORIES[file.category]?.dir || file.category;
      pluginsItems.push(`api/${dir}/${name}`);
    }
  }

  if (pluginsItems.length > 0) {
    essentialsItems.push(createCategory("Plugins", pluginsItems));
  }

  const essentials: SidebarCategory = {
    type: "category",
    label: ESSENTIALS_LABEL,
    collapsed: false,
    items: essentialsItems
  };

  // Collect names to exclude from Internals (plugin classes go in Essentials > Plugins)
  const essentialNames = new Set([...FEATURED_ITEMS, ...ESSENTIAL_INTERFACES, ...PLUGIN_ITEMS]);

  // Internals sub-categories
  const internalsSubCategories = Object.entries(INTERNALS_CATEGORIES)
    .map(([key, config]) => {
      const categoryFiles = filesByCategory.get(key) || [];

      // Exclude featured items and essential interfaces from internals
      const items = categoryFiles
        .filter(f => !essentialNames.has(f.name))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(f => `api/${config.dir}/${f.name}`);

      return createCategory(config.label, items);
    })
    .filter(cat => cat.items.length > 0);

  // Internals category (collapsed by default)
  const internals: SidebarCategory = {
    type: "category",
    label: INTERNALS_LABEL,
    collapsed: true,
    items: internalsSubCategories
  };

  return {
    api: [essentials, internals]
  };
}

/**
 * Group files by category
 */
function groupByCategory(files: GeneratedFile[]): Map<string, GeneratedFile[]> {
  const grouped = new Map<string, GeneratedFile[]>();

  for (const file of files) {
    const list = grouped.get(file.category) || [];
    list.push(file);
    grouped.set(file.category, list);
  }

  return grouped;
}

/**
 * Create a sidebar category
 */
function createCategory(label: string, items: (string | SidebarCategory)[]): SidebarCategory {
  return {
    type: "category",
    label,
    collapsed: true,
    items
  };
}

/**
 * Check if a file is a featured item
 */
export function isFeaturedItem(name: string): boolean {
  return FEATURED_ITEMS.includes(name);
}

/**
 * Get featured items list (for external use)
 */
export function getFeaturedItems(): readonly string[] {
  return FEATURED_ITEMS;
}
