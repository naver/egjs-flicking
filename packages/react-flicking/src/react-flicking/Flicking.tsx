import NativeFlicking, { FlickingOptions, Plugin, FlickingEvent, NeedPanelEvent, withFlickingMethods, DEFAULT_OPTIONS, VisibleChangeEvent } from "@egjs/flicking";
import * as React from "react";
import { findDOMNode } from "react-dom";
import ChildrenDiffer from "@egjs/react-children-differ";
import { CloneComponent } from "./Clone";
import { FLICKING_PROPS } from "./consts";
import { FlickingProps, FlickingType } from "./types";
import ListDiffer from "@egjs/list-differ";
import { ChildrenDiffResult } from "@egjs/children-differ";

class Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>> {
  public static defaultProps: FlickingProps = FLICKING_PROPS;
  public state: {
    cloneCount: number,
  } = {
    cloneCount: 0,
  };
  // Flicking
  @withFlickingMethods
  private flicking?: NativeFlicking | null;
  private options: FlickingOptions = {
    ...DEFAULT_OPTIONS,
    renderExternal: true,
  };
  // differ
  private pluginsDiffer: ListDiffer<Plugin> = new ListDiffer<Plugin>();
  private jsxDiffer: ListDiffer<string>;

  // life cycle
  constructor(props: Partial<FlickingProps & FlickingOptions>) {
    super(props);
    const options = this.options;
    for (const name in props) {
      if (name in DEFAULT_OPTIONS) {
        options[name] = props[name];
      }
    }
  }

  public render() {
    const props = this.props;
    /* tslint:disable:naming-convention */
    const Tag = props.tag as any;
    const Viewport = props.viewportTag as any;
    const Camera = props.cameraTag as any;
    /* tslint:enable:naming-convention */
    const classPrefix = props.classPrefix;
    const attributes: { [key: string]: any } = {};

    for (const name in props) {
      if (!(name in FLICKING_PROPS) && !(name in DEFAULT_OPTIONS)) {
        attributes[name] = props[name];
      }
    }
    return (
      <Tag {...attributes}>
        <Viewport className={`${classPrefix}-viewport`}>
          <Camera className={`${classPrefix}-camera`}>
            <ChildrenDiffer onUpdate={this.onUpdate}>
              {this.renderPanels()}
            </ChildrenDiffer>
          </Camera>
        </Viewport>
      </Tag>
    );
  }

  public onUpdate = (result: ChildrenDiffResult<HTMLElement>) => {
    this.flicking!.sync(result as ChildrenDiffResult<HTMLElement>);
    this.checkPlugins();
    this.checkCloneCount();
  }

  public componentDidMount() {
    this.flicking = new NativeFlicking(
      findDOMNode(this) as HTMLElement,
      {
        ...this.options,
        framework: "react",
        frameworkVersion: React.version,
      } as object,
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
      visibleChange: (e: VisibleChangeEvent) => {
        this.props.onVisibleChange!(e);
        this.forceUpdate();
      },
    });
    const children = this.getChildren();
    this.jsxDiffer = new ListDiffer<string>(children.map(child => `${child.key}`));

    if (this.props.status) {
      this.setStatus(this.props.status);
    }
    this.checkPlugins();
    this.checkCloneCount();

    if (this.props.renderOnlyVisible) {
      this.forceUpdate();
    }
  }

  public componentWillUnmount() {
    this.destroy({ preserveUI: true });
  }

  // private
  private checkPlugins() {
    const { list, added, removed, prevList } = this.pluginsDiffer.update(this.props.plugins!);

    this.flicking!.addPlugins(added.map(index => list[index]));
    this.flicking!.removePlugins(removed.map(index => prevList[index]));
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
    const { renderOnlyVisible } = this.props;
    const flicking = this.flicking;
    const reactChildren = this.getChildren();
    let panels: Array<React.ReactElement<any>>;

    if (flicking && renderOnlyVisible) {
      const diffResult = this.jsxDiffer.update(reactChildren.map(child => `${child.key}`));
      const panelCnt = reactChildren.length;

      flicking.beforeSync(diffResult);

      const indexesToRender = flicking.getRenderingIndexes(diffResult);
      panels = indexesToRender.map(index => {
        if (index >= panelCnt) {
          const relativeIndex = index % panelCnt;
          const cloneIndex = Math.floor(index / panelCnt) - 1;
          const origEl = reactChildren[relativeIndex];

          return <CloneComponent key={`clone${cloneIndex}${origEl.key}`}>{origEl}</CloneComponent>;
        } else {
          return reactChildren[index];
        }
      });
    } else {
      const cloneCount = this.state.cloneCount;
      panels = [...reactChildren];

      for (let i = 0; i < cloneCount; ++i) {
        panels = panels.concat(reactChildren.map(el => {
          return <CloneComponent key={`clone${i}${el.key}`}>{el}</CloneComponent>;
        }));
      }
    }

    return panels;
  }

  private getChildren() {
    const children = React.Children.toArray(this.props.children).slice() as Array<React.ReactElement<any>>;
    return typeof this.props.lastIndex === "number"
      ? children.slice(0, this.props.lastIndex + 1)
      : children;
  }
}
interface Flicking extends React.Component<Partial<FlickingProps & FlickingOptions>>, FlickingType<Flicking> { }
export default Flicking;
