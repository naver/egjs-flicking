/* eslint-disable */
function requestUrl(url, callback) {
  var req = new XMLHttpRequest();
  req.addEventListener("load", function () {
    callback(req.responseText);
  });
  req.open("GET", url);
  req.send();
}

function resolvePath(path1, path2) {
  var paths = path1.split("/").slice(0, -1).concat(path2.split("/"));

  paths = paths.filter(function (directory, i) {
    return i === 0 || directory !== ".";
  });

  var index = -1

  while ((index = paths.indexOf("..")) > 0) {
    paths.splice(index - 1, 2);
  }
  return paths.join("/");
}
function toArray(arr) {
  return [].slice.call(arr);
}
function $(selector, parent) {
  return toArray(parent.querySelectorAll(selector));
}
requestUrl(location.href, function (res) {
  var html = document.createElement("html");
  html.innerHTML = res;

  var cssFiles = $("link[href]", html);
  var scriptFiles = $(`script[src]:not([src*="codepen"]):not([src*="analytics"])`, html);
  var inlineScripts = $("script:not([src])", html);
  var inlineStyles = $("style", html);
  var titleEl = $("title", document);
  var body = $("body", html);
  var title = titleEl && titleEl.innerText || "";

  var cssText = inlineStyles.map(function (el) { return el.innerText; }).join("\n").trim();
  var jsText = inlineScripts.map(function (el) {
    var script = el.getAttribute("data-script");
    var comment = "// " + (script ? "script: " + script : "");
    return comment + "\n" + el.innerText.trim();
  }).join("\n").trim();

  var scriptPaths = scriptFiles.map(function (el) { return el.getAttribute("src"); });
  var cssPaths = cssFiles.map(function (el) { return el.getAttribute("href"); });

  $("script, link, style", html).forEach(function (el) {
    el.parentNode.removeChild(el);
  });

  var href = location.href;
  $("img", html).forEach(function (el) {
    var path = el.getAttribute("src");
    if (path.indexOf("http") !== 0) {
      el.setAttribute("src", resolvePath(href, path));
    }
  });
  cssText = cssText.replace(/url\((\S+)\)/g, function (original, path) {
    if (path.indexOf("http") === 0) {
      return original;
    } else {
      return original.replace(path, resolvePath(href, path));
    }
  });
  scriptPaths = scriptPaths.map(function (path) {
    if (path.indexOf("http") === 0) {
      return path;
    } else {
      return resolvePath(href, path);
    }
  });
  cssPaths = cssPaths.map(function (path) {
    if (path.indexOf("http") === 0) {
      return path;
    } else {
      return resolvePath(href, path);
    }
  });
  var htmlText = body[0].innerHTML.trim();
  var data = {
    title: title,
    description: title,
    private: false,
    head: "<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi'>",
    html: htmlText,
    html_pre_processor: "none",
    css: cssText,
    css_pre_processor: "none",
    css_starter: "neither",
    css_prefix_free: false,
    js: jsText,
    js_pre_processor: "babel",
    html_classes: "loading",
    css_external: cssPaths.join(";"),
    js_external: scriptPaths.join(";"),
  };
  document.body.insertAdjacentHTML("afterbegin", `<form class="codepenform" action="https://codepen.io/pen/define" method="POST" target="_blank">
    <input type="hidden" name="data" value="${JSON.stringify(data).replace(/"/g, "&quot;").replace(/'/g, "&apos;")}">
    <button style="position: absolute; right: 10px; top: 10px; border:0;background:transparent;cursor: pointer;">
    <svg style="width:40px;height:40px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="179.851px" height="120.095px" viewBox="0 0 179.851 120.095" enable-background="new 0 0 179.851 120.095" xml:space="preserve">
    <g><g><rect x="104.055" y="54.547" fill="#555" width="48.38" height="11"/></g>
    <g><g><path fill="#555" d="M149.336,60.047c-8.046-8.046-11.881-23.957-12.196-34.996c11.031,14.821,25.367,27.747,42.711,34.996     c-17.344,6.941-31.048,20.649-42.711,34.996C138.087,83.223,140.975,68.875,149.336,60.047z"/></g></g></g>
  <g>
    <polygon fill="#555" points="29.301,54.708 29.301,65.388 37.284,60.048  "/>
    <polygon fill="#555" points="56.856,46.956 56.856,32.073 31.855,48.739 43.023,56.21  "/>
    <polygon fill="#555" points="88.239,48.739 63.238,32.073 63.238,46.956 77.072,56.21  "/>
    <polygon fill="#555" points="31.855,71.356 56.856,88.022 56.856,73.14 43.023,63.888  "/>
    <polygon fill="#555" points="63.238,73.14 63.238,88.022 88.239,71.356 77.072,63.888  "/>
    <polygon fill="#555" points="60.047,52.499 48.762,60.048 60.047,67.597 71.333,60.048  "/>
    <path fill="#555" d="M60.047,0C26.885,0,0,26.884,0,60.048s26.885,60.047,60.047,60.047c33.164,0,60.048-26.883,60.048-60.047   S93.211,0,60.047,0z M97.175,71.36c0,0.141-0.01,0.279-0.028,0.418c-0.007,0.045-0.018,0.092-0.025,0.137   c-0.017,0.09-0.032,0.18-0.056,0.268c-0.014,0.053-0.033,0.104-0.05,0.154c-0.025,0.078-0.051,0.156-0.082,0.234   c-0.021,0.053-0.048,0.104-0.071,0.154c-0.034,0.072-0.069,0.143-0.108,0.213c-0.028,0.049-0.061,0.098-0.091,0.146   c-0.043,0.066-0.087,0.131-0.135,0.193c-0.035,0.049-0.071,0.094-0.11,0.139c-0.05,0.059-0.103,0.117-0.158,0.172   c-0.042,0.043-0.083,0.086-0.127,0.125c-0.058,0.053-0.119,0.104-0.182,0.152c-0.047,0.037-0.094,0.074-0.144,0.109   c-0.019,0.012-0.035,0.027-0.054,0.039L61.817,96.64c-0.536,0.357-1.152,0.537-1.771,0.537c-0.616,0-1.233-0.18-1.77-0.537   L24.34,74.015c-0.018-0.012-0.034-0.027-0.052-0.039c-0.05-0.035-0.098-0.072-0.145-0.109c-0.062-0.049-0.123-0.1-0.181-0.152   c-0.044-0.039-0.086-0.082-0.128-0.125c-0.056-0.055-0.107-0.113-0.159-0.172c-0.037-0.045-0.074-0.09-0.109-0.139   c-0.047-0.062-0.092-0.127-0.134-0.193c-0.032-0.049-0.062-0.098-0.092-0.146c-0.039-0.07-0.074-0.141-0.108-0.213   c-0.024-0.051-0.049-0.102-0.071-0.154c-0.031-0.078-0.058-0.156-0.082-0.234c-0.018-0.051-0.035-0.102-0.05-0.154   c-0.023-0.088-0.039-0.178-0.056-0.268c-0.008-0.045-0.02-0.092-0.025-0.137c-0.019-0.139-0.029-0.277-0.029-0.418V48.735   c0-0.141,0.011-0.279,0.029-0.416c0.006-0.047,0.018-0.092,0.025-0.139c0.017-0.09,0.032-0.18,0.056-0.268   c0.015-0.053,0.032-0.104,0.05-0.154c0.024-0.078,0.051-0.156,0.082-0.232c0.022-0.053,0.047-0.105,0.071-0.156   c0.034-0.072,0.069-0.143,0.108-0.211c0.029-0.051,0.06-0.1,0.092-0.148c0.042-0.066,0.087-0.131,0.134-0.193   c0.035-0.047,0.072-0.094,0.109-0.139c0.052-0.059,0.104-0.117,0.159-0.172c0.042-0.043,0.084-0.086,0.128-0.125   c0.058-0.053,0.118-0.104,0.181-0.152c0.047-0.037,0.095-0.074,0.145-0.109c0.018-0.012,0.034-0.027,0.052-0.039l33.938-22.625   c1.072-0.715,2.468-0.715,3.54,0l33.937,22.625c0.019,0.012,0.035,0.027,0.054,0.039c0.05,0.035,0.097,0.072,0.144,0.109   c0.062,0.049,0.124,0.1,0.182,0.152c0.044,0.039,0.085,0.082,0.127,0.125c0.056,0.055,0.108,0.113,0.158,0.172   c0.039,0.045,0.075,0.092,0.11,0.139c0.048,0.062,0.092,0.127,0.135,0.193c0.03,0.049,0.062,0.098,0.091,0.148   c0.039,0.068,0.074,0.139,0.108,0.211c0.023,0.051,0.05,0.104,0.071,0.156c0.031,0.076,0.057,0.154,0.082,0.232   c0.017,0.051,0.036,0.102,0.05,0.154c0.023,0.088,0.039,0.178,0.056,0.268c0.008,0.047,0.019,0.092,0.025,0.139   c0.019,0.137,0.028,0.275,0.028,0.416V71.36z"/>
    <polygon fill="#555" points="90.794,65.388 90.794,54.708 82.812,60.048  "/>
  </g></svg></button></form>`);
});
