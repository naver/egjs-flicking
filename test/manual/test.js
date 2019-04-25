var PANEL_COLORS = [
  "primary",
  "danger",
  "info",
  "success",
  "warning",
  "grey-lighter",
  "dark",
  "link",
  "grey-light"
];

var methodLog = function(element, v) {
  var elLog1 = document.querySelector("#log1");
  try {
    elLog1.innerHTML = element.innerHTML + " ==> " + JSON.stringify(v);
  } catch (e) {
    // Circular structure
    elLog1.innerHTML = element.innerHTML + " ==> " + v.toString();
  }
}

var logPanel = function(panel) {
  var elLog1 = document.querySelector("#log1");
  var panelInfo = "{\n";
  panelInfo += "  index: " + panel.getIndex() + ",\n";
  panelInfo += "  position: " + panel.getPosition() + ",\n";
  panelInfo += "  anchorPosition: " + panel.getAnchorPosition() + ",\n";
  panelInfo += "  relativeAnchorPosition: " + panel.getRelativeAnchorPosition() + ",\n";
  panelInfo += "  size: " + panel.getSize() + ",\n";
  panelInfo += "  isClone: " + panel.isClone() + ",\n";
  panelInfo += "  progress: " + panel.getProgress() + ",\n";
  panelInfo += "  outsetProgress: " + panel.getOutsetProgress() + ",\n";
  panelInfo += "  visibleRatio: " + panel.getVisibleRatio() + ",\n";
  panelInfo += "}";

  elLog1.innerHTML = "Panel " + panel.getIndex() + " ==> " + panelInfo;
}

var log = function(e) {
  console.log(e);
  var elLog2 = document.querySelector('#log2');
  if (log.end || !log.count) {
    elLog2.innerHTML = "";
    log.count = 1;
  }

  var msg = [ log.count++, e.type, e.direction, e.index ].join(" : ");

  elLog2.innerHTML = [ msg, elLog2.innerHTML, ""].join("<br>");
  log.end = /^(moveEnd)$/.test(e.type);
}

var createFlicking = function(el, options) {
  var flicking = new eg.Flicking(el, options);
  var flickingElement = flicking.getElement();

  var tagGroup = document.createElement("div");
  tagGroup.classList.add("field", "is-grouped", "is-grouped-multiline");

  var addTag = function(option, optionVal) {
    var tagControl = document.createElement("div");
    tagControl.classList.add("control");

    var tagWrapper = document.createElement("div");
    tagWrapper.classList.add("tags", "has-addons");

    var tagName = document.createElement("span");
    tagName.classList.add("tag", "is-dark");
    tagName.innerText = option;

    var tagVal = document.createElement("span");
    tagVal.classList.add("tag", "is-info");
    tagVal.innerText = optionVal;

    tagWrapper.appendChild(tagName);
    tagWrapper.appendChild(tagVal);

    tagControl.appendChild(tagWrapper);

    tagGroup.appendChild(tagControl);
  }

  var optionKeys = Object.keys(options);

  if (!options || !optionKeys.length) {
    tagGroup.innerHTML = '\
    <div class="control">\
      <div class="tags has-addons">\
        <span class="tag is-dark">options</span>\
        <span class="tag is-warning">default</span>\
      </div>\
    </div>'
  } else {

    for (var option in options) {
      var optionVal = options[option];

      if (typeof optionVal === "object") {
        for (var innerKey in optionVal) {
          var val = optionVal[innerKey];
          addTag(innerKey, val);
        }
      } else {
        addTag(option, optionVal);
      }
    }
  }

  flickingElement.parentNode.insertBefore(tagGroup, flickingElement.nextSibling);

  return flicking;
}

// Make panel which size is as half as viewport's size
var createPanelElement = function (idx) {
  var element = document.createElement("div");
  element.classList.add("column", "is-half", 'has-background-' + PANEL_COLORS[Math.abs(idx % PANEL_COLORS.length)]);
  element.innerHTML = '<p>Layer ' + idx + '</p>';
  return element;
}

setTimeout(function() {
    document.body.style.display = "";

    // Horizontal, Non-circular
    f1 = createFlicking("#flick1", {
      autoResize: true
    });
    f1a = createFlicking("#flick1-1", {
      anchor: 0,
      hanger: 0,
      autoResize: true
    });
    f1b = createFlicking("#flick1-2", {
      hanger: "0%",
      anchor: "0%",
      autoResize: true
    });
    f1c = createFlicking("#flick1-3", {
      hanger: "100%",
      anchor: "100%",
      bound: true,
      autoResize: true
    });
    f1d = createFlicking("#flick1-4", {
      hanger: "100%",
      anchor: "100%",
      autoResize: true
    });
    f1e = createFlicking("#flick1-5", {
      adaptive: true,
      autoResize: true
    });
    f1f = createFlicking("#flick1-6", {
      gap: 100,
      autoResize: true
    });

    // Circular
    f2 = createFlicking("#flick2", {
      circular: true,
      duration: 300,
      autoResize: true
    });
    f2a = createFlicking("#flick2-1", {
      circular: true,
      duration: 300,
      autoResize: true
    });
    f2b = createFlicking("#flick2-2", {
      circular: true,
      gap: 10,
      duration: 3000,
      autoResize: true
    }).on("select", e => e.panel.prev().prev().prev().focus(3000));
    f2c = createFlicking("#flick2-3", {
      circular: true,
      autoResize: true
    });
    f2d = createFlicking("#flick2-4", {
      circular: true,
      gap: 10,
      autoResize: true
    });

    // Vertical
    f3 = createFlicking("#flick3", {
      horizontal: false,
      autoResize: true
    });
    f3a = createFlicking("#flick3-1", {
      horizontal: false,
      bound: true,
      autoResize: true,
      anchor: "100%",
      hanger: "100%"
    });
    f3b = createFlicking("#flick3-2", {
      horizontal: false,
      circular: true,
      autoResize: true
    });

    // Snap & Free Scroll
    f4 = createFlicking("#flick4", {
      moveType: {type: "snap", count: 2},
      duration: 3000,
      bounce: 100,
      autoResize: true
    });
    f4a = createFlicking("#flick4-1", {
      moveType: {type: "snap", count: 2},
      circular: true,
      duration: 1000,
      autoResize: true
    });
    f4b = createFlicking("#flick4-2", {
      moveType: "freeScroll",
      duration: 500,
      bounce: 100,
      autoResize: true
    });
    f4c = createFlicking("#flick4-3", {
      moveType: "freeScroll",
      circular: true,
      duration: 500,
      autoResize: true
    });

    // Events & Methods
    fe = createFlicking("#flick-event", {
      circular: true,
      moveType: "freeScroll",
      autoResize: true
    }).on({
      holdStart: log,
      moveStart: log,
      move: log,
      holdEnd: log,
      change: log,
      restore: log,
      moveEnd: log,
      select: function(e) {
        e.panel.focus();
        log(e);
      }
    });
    var methods = new eg.Flicking("#methods", {
      circular: true,
      autoResize: true
    });

    // Event Stopping
    s1 = createFlicking("#stop-holdStart", {
      circular: true,
      autoResize: true
    }).on({
      holdStart: function(e) {
        e.stop()
      }
    });
    s2 = createFlicking("#stop-moveStart", {
      circular: true,
      autoResize: true
    }).on({
      moveStart: function(e) {
        e.stop()
      }
    });
    s3 = createFlicking("#stop-move", {
      circular: true,
      autoResize: true
    }).on({
      move: function(e) {
        e.stop()
      }
    });
    s4 = createFlicking("#stop-change", {
      circular: true,
      autoResize: true
    }).on({
      change: function(e) {
        e.stop()
      }
    });
    s5 = createFlicking("#stop-restore", {
      circular: true,
      threshold: 500,
      autoResize: true
    }).on({
      restore: function(e) {
        e.stop()
      }
    });

    // Non-successive indexes to test needPanel event
    n1 = createFlicking("#needPanel-addOnClick", {
      infinite: true,
      autoResize: true
    }).on({
      needPanel: function(e) {
        console.log("NEED_PANEL", e)
      },
      select: function(e) {
        e.panel.insertAfter(createPanelElement(e.index + 1))
      }
    });
    n1.replace(0, createPanelElement(0));
    n1.replace(100, createPanelElement(100));

    n2 = createFlicking("#needPanel-insert1by1", {
      circular: true,
      infinite: true,
      moveType: "freeScroll",
      lastIndex: 50,
      duration: 3000,
      autoResize: true
    }).on({
      needPanel: function(e) {
        console.log("NEED_PANEL", e);
        e.direction === eg.Flicking.DIRECTION.NEXT
          ? e.index === 50
            ? n2.replace(e.range.min, createPanelElement(e.range.min))
            : e.panel.insertAfter(createPanelElement(e.index + 1))
          : e.panel.insertBefore(createPanelElement(e.index - 1));
      }
    });
    n2.replace(50, createPanelElement(50));

    n3 = createFlicking("#needPanel-insert3", {
      infinite: true,
      autoResize: true,
      moveType: {
        type: "snap",
        count: 3
      }
    }).on({
      needPanel: function(e) {
        console.log("NEED_PANEL", e);
        e.direction === eg.Flicking.DIRECTION.NEXT
          ? e.panel.insertAfter([
            createPanelElement(e.index + 1),
            createPanelElement(e.index + 2),
            createPanelElement(e.index + 3)
          ])
          : e.panel.insertBefore([
            createPanelElement(e.index - 3),
            createPanelElement(e.index - 2),
            createPanelElement(e.index - 1)
          ]);
      }
    });
    n3.replace(10, createPanelElement(10));

    n4 = createFlicking("#needPanel-setMax", {
      infinite: true,
      autoResize: true,
      lastIndex: 51
    }).on({
      needPanel: function(e) {
        console.log("NEED_PANEL", e);
        if (e.panel) {
          e.direction === eg.Flicking.DIRECTION.NEXT
          ? e.panel.insertAfter(createPanelElement(e.index + 1))
          : e.panel.insertBefore(createPanelElement(e.index - 1));
        } else {
          // No panels exist
          n4.append(createPanelElement(0));
        }
      }
    });
    document.querySelector("#setLastIndex").addEventListener("click", function(e) {
      e.stopPropagation();
      var el = e.target;
      if(el.tagName != "BUTTON") { return; }

      var value = +el.querySelector("#lastIndex").value;

      console.log("SET LAST INDEX TO", value);
      n4.setLastIndex(value);
    });
    n4.resize();

    n5 = createFlicking("#needPanel-circular", {
      infinite: true,
      circular: true,
      autoResize: true,
      moveType: "freeScroll",
      lastIndex: 50
    }).on({
      needPanel: function(e) {
        console.log("NEED_PANEL", e);
        e.direction === eg.Flicking.DIRECTION.NEXT
          ? e.panel.insertAfter(createPanelElement(e.index + 1))
          : e.index === 0
            ? n5.replace(e.range.max, createPanelElement(e.range.max))
            : e.panel.insertBefore(createPanelElement(e.index - 1));
      }
    });
    n5.replace(0, createPanelElement(0));

    var status;
    document.querySelector("#methods").addEventListener("click", function(e) {
      var el = e.target;
      var method = el.id;

      if(el.tagName != "BUTTON") { return; }

      if(/prev|next/.test(method)) {
        fe[method]();
      } else if(method === "moveTo") {
        fe[method](+document.querySelector('#moveTo_no').value);
      } else if (method === "getCurrentPanel") {
        logPanel(fe[method]());
      } else if (method === "getPanel") {
        logPanel(fe[method](+document.querySelector('#getPanel_no').value));
      } else if (method === "append") {
        var index = fe.getPanelCount();
        var elementToAdd = document.createElement("div");
        elementToAdd.classList.add("column", "is-one-fifth", 'has-background-' + PANEL_COLORS[index % PANEL_COLORS.length])
        elementToAdd.innerHTML = '<p>Layer ' + index + '</p>';

        fe[method](elementToAdd);
        methodLog(el, 'Append index: ' + index + ', total: ' + fe.getPanelCount());
      } else if (method === "prepend") {
        var firstPanel = fe.getAllPanels()[0];
        var index = firstPanel && firstPanel.index > 0
          ? firstPanel.index - 1
          : 0;
        var elementToAdd = document.createElement("div");
        elementToAdd.classList.add("column", "is-one-fifth", 'has-background-' + PANEL_COLORS[index % PANEL_COLORS.length])
        elementToAdd.innerHTML = '<p>Layer ' + index + '</p>';

        fe[method](elementToAdd);
        methodLog(el, 'Prepend index: ' + index + ', total: ' + fe.getPanelCount());
      } else if (method === "replace") {
        var index = +document.querySelector('#' + method + '_no').value;
        var elementToAdd = document.createElement("div");
        elementToAdd.classList.add("column", "is-one-fifth", 'has-background-' + PANEL_COLORS[index % PANEL_COLORS.length])
        elementToAdd.innerHTML = '<p>Layer ' + index + '</p>';

        fe[method](index, elementToAdd);
        methodLog(el, 'Replace index: ' + index + ', total: ' + fe.getPanelCount());
      } else if (method === "remove") {
        var index = +document.querySelector("#remove_idx").value;
        var devareCnt = +document.querySelector("#remove_cnt").value;
        fe[method](index, devareCnt)
      } else if (method === "getStatus") {
        status = fe[method]();
        methodLog(el, status);
      } else if (method === "setStatus") {
        methodLog(el, fe[method](status));
      } else {
        methodLog(el, fe[method]());
      }
    });
}, 500);
