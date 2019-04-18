var CustomPagination = function (container){
  var length = 0;
  var element;
  var itemTag;
  var items = [];

  return {
    update: function (flicking) {
      var prevLength = length;
      length = flicking.getPanelCount();

      if (prevLength < length) {
        var fragment = document.createDocumentFragment();
        for (var i = prevLength; i < length; ++i) {
          (function (item) {
            item.className += "flicking-pagination-item";
            items.push(item);
            item.addEventListener("click", function () {
              flicking.moveTo(items.indexOf(item));
            });
            fragment.appendChild(item);
          })(document.createElement(itemTag));
        }
        element.appendChild(fragment);
      }
      var selectedElement = element.querySelector(".selected");
      if (selectedElement) {
        selectedElement.className = selectedElement.className.replace(/\s*selected/g, "");
      }
      items[flicking.getIndex()].className += " selected";
    },
    init: function(flicking) {
      element = typeof container === "object" ? container : document.querySelector(container);
      element.className += " flicking-pagination";
      itemTag = element.nodeName === "UL" ? "li" : "div";

      flicking.on("moveEnd", function (e) {
        var selectedElement = element.querySelector(".selected");
        if (selectedElement) {
          selectedElement.className = selectedElement.className.replace(/\s*selected/g, "");
        }

        items[flicking.getIndex()].className += " selected";
      });
      this.update(flicking);
    },
  };
};
