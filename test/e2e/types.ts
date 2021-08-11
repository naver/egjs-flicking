import { FlickingOptions } from "~/Flicking";

export interface Fixture {
  options: Partial<FlickingOptions>;
  panels: PanelFixture[];
  styles: string[];
}

export interface PanelFixture {
  tag: string;
  class: string;
  text: string;
}
