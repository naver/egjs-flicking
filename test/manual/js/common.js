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
