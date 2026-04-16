import path from "path";
import { UserConfig, BuildOptions, PluginOption, LibraryFormats } from "vite";

/**
 * Interface for the input options provided by each package
 * Extends basic Vite UserConfig to allow overrides while enforcing helper-specific requirements
 */
export interface ViteConfigOptions extends Partial<Pick<UserConfig, "plugins" | "root" | "mode" | "define">> {
  input: string; // e.g., "src/index.ts"
  name: string; // Global variable name for UMD (e.g., "Flicking")
  packageJson: any; // The package.json object
  output?: string; // e.g., "dist/flicking" (default: dist/[name])
  tsconfig?: string; // Path to tsconfig (default: "tsconfig.json")
  external?: Record<string, string>; // External dependencies map
  sourcemap?: boolean;
  formats?: LibraryFormats[]; // Supported formats (default: ["es", "cjs", "umd"])
  minify?: boolean; // Enable minification (default: false)
  outputSuffix?: string; // Additional suffix for output files (e.g., ".pkgd")
  replacements?: Record<string, string>; // Custom replacement rules (key: pattern, value: replacement)
}

/**
 * 1. Plugin Factory
 * assembles the list of Vite plugins.
 */
function getPlugins(options: ViteConfigOptions, root: string): PluginOption[] {
  const { 
    tsconfig = "tsconfig.json", 
    packageJson,
    plugins = [],
    replacements: customReplacements = {}
  } = options;

  // Custom inline plugin to replace non-identifier placeholders like #__VERSION__# and #__FILETYPE__#
  const replacePlugin: PluginOption = {
    name: "replace-placeholders",
    renderChunk(code, chunk, options) {
      const format = options.format === "es" ? "es" : options.format;
      
      const defaultReplacements: Record<string, string> = {
        "#__VERSION__#": packageJson.version,
        "#__FILETYPE__#": format,
      };

      const replacements = { ...defaultReplacements, ...customReplacements };

      let newCode = code;
      Object.entries(replacements).forEach(([key, value]) => {
        if (newCode.includes(key)) {
          // Escape special characters in key for RegExp
          const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          newCode = newCode.replace(new RegExp(escapedKey, 'g'), value);
        }
      });

      return newCode !== code ? { code: newCode, map: null } : null;
    }
  };

  const defaultPlugins: PluginOption[] = [
    replacePlugin
  ];

  return [...defaultPlugins, ...plugins];
}

/**
 * 2. Build Options Factory
 * Configures the build output, library mode, and minification.
 */
function getBuildOptions(options: ViteConfigOptions): BuildOptions {
  const {
    input,
    output,
    name,
    sourcemap = true,
    external = {},
    formats = ["es", "cjs", "umd"],
    minify = false,
    outputSuffix = ""
  } = options;

  // Derive file name from output path or package name
  // options.output example: "dist/flicking" -> fileName: "flicking"
  const fileNameBase = output ? path.basename(output) : name.toLowerCase();

  return {
    sourcemap,
    lib: {
      entry: input,
      name: name,
      formats: formats,
      fileName: (format) => {
        // Match existing Rollup output patterns:
        // esm -> .esm.js
        // cjs -> .cjs.js
        // umd -> .js or .pkgd.js or .min.js or .pkgd.min.js
        const minSuffix = minify ? ".min" : "";
        switch (format) {
          case "es": return `${fileNameBase}.esm.js`;
          case "cjs": return `${fileNameBase}.cjs.js`;
          default: return `${fileNameBase}${outputSuffix}${minSuffix}.js`;
        }
      }
    },
    emptyOutDir: false, // Prevent wiping outDir when running parallel builds
    rollupOptions: {
      external: Object.keys(external),
      output: {
        globals: external
      }
    },
    minify: minify ? "terser" : false
  };
}

/**
 * 3. Main Export
 * Combines everything into the final Vite config.
 * NOTE: This function does not include type declaration generation due to potential conflicts with other builds (e.g. UMD build).
 */
export function createViteConfig(options: ViteConfigOptions): UserConfig {
  const root = options.root || process.cwd();
  const plugins = getPlugins(options, root);
  const build = getBuildOptions(options);

  return {
    plugins,
    build,
    define: options.define || {}
  };
}
