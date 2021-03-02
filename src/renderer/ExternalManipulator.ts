import ElementManipulator from "./ElementManipulator";

class ExternalManipulator extends ElementManipulator {
  public insertPanelElements(): this {
    // DO NOTHING
    return this;
  }

  public movePanelElementsToStart(): this {
    // DO NOTHING
    return this;
  }

  public movePanelElementsToEnd(): this {
    // DO NOTHING
    return this;
  }

  public resetPanelElementOrder(): this {
    // DO NOTHING
    return this;
  }

  public removePanelElements(): this {
    // DO NOTHING
    return this;
  }

  public removeAllChildNodes(): this {
    // DO NOTHING
    return this;
  }

  public removeAllTextNodes(): this {
    // DO NOTHING
    return this;
  }
}

export default ExternalManipulator;
