export interface SourceContext {
  options: { [key: string]: any };
  panels: Panel[];
  plugins?: Plugin[];
  js?: JSX.Element;
}

export interface Panel {
  tag: string;
  content: string;
  style?: { [key: string]: string };
  class?: string;
}

// [name, options]
export type Plugin = [string, { [key: string]: any }];
