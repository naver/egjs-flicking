const CustomPagination = (container) => {
  let length = 0;
  let element;
  let itemTag;
  const items = [];

  return {
    update: (flicking) => {
      const prevLength = length;
      length = flicking.panelCount;

      if (prevLength < length) {
        const fragment = document.createDocumentFragment();
        for (let i = prevLength; i < length; ++i) {
          ((item) => {
            item.className += "flicking-pagination-item";
            items.push(item);
            item.addEventListener("click", () => {
              flicking.moveTo(items.indexOf(item));
            });
            fragment.appendChild(item);
          })(document.createElement(itemTag));
        }
        element.appendChild(fragment);
      }
      const selectedElement = element.querySelector(".selected");
      if (selectedElement) {
        selectedElement.className = selectedElement.className.replace(/\s*selected/g, "");
      }
      items[flicking.getIndex()].className += " selected";
    },
    init: function(flicking) {
      element = typeof container === "object" ? container : document.querySelector(container);
      element.className += " flicking-pagination";
      itemTag = element.nodeName === "UL" ? "li" : "div";

      flicking.on("moveEnd", (e) => {
        const selectedElement = element.querySelector(".selected");
        if (selectedElement) {
          selectedElement.className = selectedElement.className.replace(/\s*selected/g, "");
        }

        items[flicking.getIndex()].className += " selected";
      });
      this.update(flicking);
    }
  };
};
