import NativeFlicking, { FlickingOptions, FlickingPanel, FlickingStatus, Plugin, FlickingEvent, NeedPanelEvent } from "@egjs/flicking";
import * as React from "react";
import { findDOMNode } from "react-dom";
import ChildrenDiffer from "@egjs/react-children-differ";
import { CloneComponent } from "./Clone";
import { DEFAULT_OPTIONS, FLICKING_PROPS } from "./consts";
import { FlickingProps, FlickingType } from "./types";
import ListDiffer from "@egjs/list-differ";
import { ChildrenDiffResult } from "@egjs/children-differ";

export default class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> implements FlickingType<Flicking> {
  public static defaultProps: FlickingProps = FLICKING_PROPS;
  // Flicking
  public options: FlickingOptions = {
    ...DEFAULT_OPTIONS,
    autoResize: true,
  };
  public state: {
    cloneCount: number,
  } = {
      cloneCount: 0,
    };
  // Flicking
  private flicking?: NativeFlicking | null;
  // differ
  private differ?: ChildrenDiffer;
  private pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  // life cycle
  public render() {
    const props = this.props;
    // tslint:disable-next-line:naming-convention
    const Tag = props.tag as any;
    const options = this.options;
    const attributes: { [key: string]: any } = {};

    for (const name in props) {
      if (name in DEFAULT_OPTIONS) {
        options[name] = props[name];
      } else if (!(name in FLICKING_PROPS)) {
        attributes[name] = props[name];
      }
    }
    return (
      <Tag {...attributes}>
        <div className="eg-flick-viewport">
          <div className="eg-flick-camera">
            <ChildrenDiffer ref={e => { this.differ = e as ChildrenDiffer; }}>
              {this.renderPanels()}
            </ChildrenDiffer>
          </div>
        </div>
      </Tag>
    );
  }
  public componentDidUpdate() {
    const result = this.differ!.update();

    this.flicking!.sync(result as ChildrenDiffResult<HTMLElement>);
    this.checkPlugins();
    this.checkCloneCount();
    if (this.props.lastIndex! >= -1) {
      this.setLastIndex(this.props.lastIndex!);
    }
  }
  public componentDidMount() {
    this.flicking = new NativeFlicking(
      findDOMNode(this) as HTMLElement,
      this.options,
    ).on({
      moveStart: (e: FlickingEvent) => this.props.onMoveStart!(e),
      move: (e: FlickingEvent) => this.props.onMove!(e),
      moveEnd: (e: FlickingEvent) => this.props.onMoveEnd!(e),
      holdStart: (e: FlickingEvent) => this.props.onHoldStart!(e),
      holdEnd: (e: FlickingEvent) => this.props.onHoldEnd!(e),
      select: (e: FlickingEvent) => this.props.onSelect!(e),
      needPanel: (e: NeedPanelEvent) => this.props.onNeedPanel!(e),
      change: (e: FlickingEvent) => this.props.onChange!(e),
      restore: (e: FlickingEvent) => this.props.onRestore!(e),
    });

    if (this.props.status) {
      this.setStatus(this.props.status);
    }
    this.checkPlugins();
    this.checkCloneCount();
  }
  public componentWillUnmount() {
    this.destroy();
  }

  // public method
  public setLastIndex(index: number): this {
    this.flicking!.setLastIndex(index);
    return this;
  }
  public prev(duration?: number) {
    this.flicking!.prev(duration);
    return this;
  }
  public next(duration?: number) {
    this.flicking!.next(duration);
    return this;
  }
  public moveTo(index: number, duration?: number) {
    this.flicking!.moveTo(index, duration);
    return this;
  }
  public getIndex(): number {
    return this.flicking!.getIndex();
  }
  public getElement(): HTMLElement {
    return this.flicking!.getElement();
  }
  public getCurrentPanel(): FlickingPanel | null {
    return this.flicking!.getCurrentPanel();
  }
  public getPanel(index: number): FlickingPanel | null {
    return this.flicking!.getPanel(index);
  }
  public getAllPanels(includeClone?: boolean): FlickingPanel[] {
    return this.flicking!.getAllPanels(includeClone);
  }
  public getVisiblePanels(): FlickingPanel[] {
    return this.flicking!.getVisiblePanels();
  }
  public getPanelCount(): number {
    return this.flicking!.getPanelCount();
  }
  public isPlaying(): boolean {
    return this.flicking!.isPlaying();
  }
  public enableInput(): this {
    this.flicking!.enableInput();
    return this;
  }
  public disableInput(): this {
    this.flicking!.disableInput();
    return this;
  }
  public getStatus(): Readonly<FlickingStatus> {
    return this.flicking!.getStatus();
  }
  public setStatus(status: FlickingStatus): void {
    this.flicking!.setStatus(status);
  }
  public addPlugins(plugins: Plugin | Plugin[]): this {
    this.flicking!.addPlugins(plugins);
    return this;
  }
  public removePlugins(plugins: Plugin | Plugin[]): this {
    this.flicking!.removePlugins(plugins);
    return this;

  }
  public destroy(): void {
    this.flicking!.destroy();
  }
  public resize(): this {
    this.flicking!.resize();
    return this;
  }

  // private
  private checkPlugins() {
    const { list, added, removed, prevList } = this.pluginsDiffer.update(this.props.plugins!);

    this.addPlugins(added.map(index => list[index]));
    this.removePlugins(removed.map(index => prevList[index]));
  }
  private checkCloneCount() {
    const cloneCount = this.flicking!.getCloneCount();

    if (this.state.cloneCount !== cloneCount) {
      this.setState({
        cloneCount,
      });
    }
  }
  private renderPanels() {
    const length = this.state.cloneCount;
    const children = React.Children.toArray(this.props.children) as Array<React.ReactElement<any>>;
    let arr: Array<React.ReactElement<any>> = [...children];

    for (let i = 0; i < length; ++i) {
      arr = arr.concat(children.map(el => {
        return <CloneComponent key={`clone${i}${el.key}`}>{el}</CloneComponent>;
      }));
    }
    return arr;
  }
}
