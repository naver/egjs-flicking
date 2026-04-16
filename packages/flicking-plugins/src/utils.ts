export const addClass = (el: HTMLElement, className: string) => {
  if (!el) return;

  if (el.classList) {
    el.classList.add(className);
  } else {
    const classes = el.className.split(" ");

    if (classes.indexOf(className) < 0) {
      el.className = `${el.className} ${className}`;
    }
  }
};

export const removeClass = (el: HTMLElement, className: string) => {
  if (!el) return;

  if (el.classList) {
    el.classList.remove(className);
  } else {
    const classRegex = new RegExp(`( |^)${className}( |$)`, "g");
    el.className.replace(classRegex, " ");
  }
};

export const getElement = (selector: string, parent: HTMLElement, pluginName: string) => {
  const el = parent.querySelector(selector);

  if (!el) {
    throw new Error(`[Flicking-${pluginName}] Couldn't find element with the given selector: ${selector}`);
  }

  return el as HTMLElement;
};
