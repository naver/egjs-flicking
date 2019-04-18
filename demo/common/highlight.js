window.addEventListener("load", function(e) {
  var scripts = [].slice.call(document.querySelectorAll("script"));
  var flickingScripts = scripts.filter(function (script) {
     return script.innerText;
  });

  flickingScripts.forEach(function (script) {
    var target = script.getAttribute("data-script");
    var reg = /\/\/\sscript:\s(\S+)/g
    var result;
    var scriptInfos = [];
    var text = script.innerText || "";
    var lastIndex = 0;
    while(result = reg.exec(text)) {
      scriptInfos.push([result[1], result.index + result[0].length]);

      if (lastIndex) {
        scriptInfos[scriptInfos.length - 2].push(result.index);
      }
      lastIndex = result.index + result[0].length;
    }
    if (lastIndex) {
      scriptInfos[scriptInfos.length - 1].push(text.length);
    } else {
      scriptInfos.push([target || "", 0, text.length]);
    }
    scriptInfos.forEach(function (scriptInfo) {
      var selector = scriptInfo[0] ? "pre code[data-script=\"" + scriptInfo[0] + "\"]" : "pre code";
      var el = document.querySelector(selector);
      el && (el.innerText = text.substring(scriptInfo[1], scriptInfo[2]).replace(/^\n/g, ""));
    });
  });
  hljs.initHighlighting();
});
