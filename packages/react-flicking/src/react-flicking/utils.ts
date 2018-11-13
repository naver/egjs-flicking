export function hasClass(element: HTMLElement, className: string) {
  if (element.classList) {
    return element.classList.contains(className);
  }
  return !!element.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}

export function addClass(element: HTMLElement, className: string) {
  if (element.classList) {
    element.classList.add(className); 
  } else {
    element.className += ` ${className}`;
  }
  return true;
}