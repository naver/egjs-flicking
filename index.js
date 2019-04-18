var pages = document.body.querySelectorAll(".page");
var isMobile = false;
var itemHeight = 0;
var currentPage = 0;
var isEnableScroll = true;
var timerId = -1;

function enableScrollTimer() {
  isEnableScroll = false;
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(function () {
    isEnableScroll = true;
  }, 600);
}
function getScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
}
function getPage(isNear) {
  var height = itemHeight;
  var scrollTop = getScrollTop();
  var page = Math.floor(scrollTop / height);
  var progress = scrollTop % height;

  if (isNear && page < 6 && progress > scrollTop / 2) {
    return page + 1;
  }

  if (page === 5 && progress > 150) {
    // footer
    return 6;
  }
  return page;
}
function changePagination(from, to) {
  paginationLiElements[from].classList.remove("checked");
  paginationLiElements[to].classList.add("checked");

  currentPage = to;
}
function check() {
  var page = getPage();

  if (page !== currentPage) {
    changePagination(currentPage, page);
  }
}

function scroll(index) {
  if (!isEnableScroll) {
    return;
  }
  var scrollTop = getScrollTop();

  Scene.animateItem({
    scrollTop: [scrollTop, scrollTop + pages[index].getBoundingClientRect().top],
  }, {
    easing: Scene.EASE_IN_OUT,
    duration: 0.5,
  }).on("animate", function (e) {
    window.scrollTo(0, e.frame.get("scrollTop"));
  });
  enableScrollTimer();
}
var paginationLiElements = document.querySelectorAll(".pagination li");

[].slice.call(paginationLiElements).forEach(function (el, i) {
  el.addEventListener("click", function () {
    scroll(i);
  });
});
window.addEventListener("scroll", check);
window.addEventListener("wheel", function (e) {
  if (!isMobile) {
    e.preventDefault();
    if (isEnableScroll) {
      var page = getPage();
      var delta = e.deltaY;

      if (page === currentPage) {
        if (Math.abs(delta) > 40) {
          if (delta > 0 && page < 6) {
            scroll(page + 1);
          } else if (delta < 0 && page > 0) {
            scroll(page - 1);
          } else {
            enableScrollTimer();
          }
        }
      } else if (page > currentPage && delta > 0 || page < currentPage && delta < 0) {
        currentPage = page;
        scroll(page);
      }
    }
  }
}, {
  passive: false,
});

var body = document.body;
function resize() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  itemHeight = pages[0].getBoundingClientRect().height;
  isMobile = height < 700 || width < 800;
}

window.addEventListener("resize", resize);

resize();
check();
// page1
var playTimerId = 0;
var step = 0;

var iphoneFlicking = new eg.Flicking(".page1 .iphone .panels", {
  circular: true,
  gap: 10,
  panelEffect: Scene.EASE_IN_OUT,
}).on({
  change: function (e) {
    step = e.index;
  },
  holdStart: function () {
    pause();
  },
  holdEnd: function (e) {
    play();
  },
});

var progressLiElements = document.querySelectorAll(".progress li");
[].slice.call(progressLiElements).forEach(function (el, i) {
  el.addEventListener("click", function (e) {
    cardFlicking.moveTo(i);
    play();
  });
})

var cardFlicking = new eg.Flicking(".page1 .kingcard .levels", {
  duration: 300,
  panelEffect: Scene.EASE_IN_OUT,
  circular: true,
}).on({
  move: function (e) {
    var progress = e.progress;
    var scale = 0.8;
    if (progress < 0.4) {
      progress *= scale;
    } else {
      progress = 0.32 + 0.68 * (progress - 0.4) / 0.6;
    }
    cardScene.setTime((progress * 100) + "%");
  },
  change: function (e) {
    step = 4 + e.index;
    progressLiElements[cardFlicking.getIndex()].classList.remove("checked");
    progressLiElements[e.index].classList.add("checked");
  },
  holdStart: function (e) {
    pause();
  },
  holdEnd: function (e) {
    play();
  },
});

var cardScene = new Scene({
  ".card-wrapper.forward": {
    0: {
      transform: "rotateY(0deg)",
    },
    2: {
      transform: "rotateY(360deg)"
    },
  },
  ".card-wrapper.backward": {
    0: {
      transform: "rotateY(180deg)",
    },
    2: {
      transform: "rotateY(540deg)"
    },
  },
  ".shadow": {
    0: {
      width: "100px",
      easing: Scene.EASE_IN,
    },
    0.5: {
      width: "10px",
      easing: Scene.EASE_OUT,
    },
    1: {
      width: "100px",
    },
    options: {
      iterationCount: 2,
    }
  }
}, {
  selector: true,
}).setTime(0);


var fingerScene = new Scene({
  ".finger": {
    0: {
      transform: {
        translate: "0px",
        rotate: "-20deg",
      },
      opacity: 0,
    },
    0.2: {
      opacity: 1,
    },
    0.6: {
      transform: {
        translate: "-110px",
      },
      opacity: 1,
    },
    0.7: {
      opacity: 0,
    },
    options: {
      easing: Scene.EASE_IN_OUT,
    }
  }
}, {
  selector: true,
}).setTime(0);


function move(cardTransform, iphoneTransform) {
  new Scene({
    ".kingcard": {
      transform: {
        translate: cardTransform,
      },
    },
    ".iphone-wrapper": {
      transform: {
        translate: iphoneTransform,
      },
    },
  }, {
    duration: 1,
    easing: Scene.EASE_IN_OUT,
    selector: true
  }).play();

  if (step < 4) {
    step = 4;
    cardFlicking.moveTo(0, 0);
  } else {
    step === 7 && cardFlicking.next(600);
    step = 0;
    iphoneFlicking.moveTo(0, 0);
  }
  fingerScene.finish();
  play();
}
function next() {
  var iphoneTransform = step < 4 ? ["0%", "-100%"] : ["100%", "0%"];
  var cardTransform = step < 4 ? ["0%", "-100%"] : ["-100%", "-200%"];

  move(cardTransform, iphoneTransform);
}
document.querySelector(".ex .buttons .prev").addEventListener("click", function () {
  var iphoneTransform = step < 4 ? ["0%", "100%"] : ["-100%", "0%"];
  var cardTransform = step < 4 ? ["-200%", "-100%"] : ["-100%", "0%"];

  move(cardTransform, iphoneTransform);
});
document.querySelector(".ex .buttons .next").addEventListener("click", next);


function play() {
  clearTimeout(playTimerId);
  playTimerId = setTimeout(function () {
    if (step === 3 || step === 7) {
      next();
    } else {
      if (step < 4) {
        iphoneFlicking.next(600);
      } else {
        cardFlicking.next(600);
      }
      fingerScene.play();
    }
    play();
  }, 1500);
}
play();
function pause() {
  clearTimeout(playTimerId);
}




document.querySelector(".page1 .download").addEventListener("click", function () {
  scroll(4);
});
var featuresFlicking = new eg.Flicking(".page2 .features", {
  hanger: 0,
  anchor: 0,
  duration: 500,
  gap: 50,
  moveType: {type: "snap", count: 3},
  bound: true,
  overflow: "visible",
});

document.querySelector(".page2 .features").addEventListener("click", function (e) {
  if (featuresFlicking.isPlaying()) {
    e.preventDefault();
  }
});


// page3
var pluginsFlicking = new eg.Flicking(".page3 .plugins", {
  hanger: 0,
  anchor: 0,
  duration: 500,
  gap: 50,
  moveType: {type: "snap", count: 2},
  bound: true,
  overflow: "visible",
});

document.querySelector(".page3 .plugins").addEventListener("click", function (e) {
  if (pluginsFlicking.isPlaying()) {
    e.preventDefault();
  }
});


// page4
var usesFlicking = new eg.Flicking(".page4 .uses", {
  hanger: 0,
  anchor: 0,
  duration: 500,
  gap: 50,
  moveType: {type: "snap", count: 2},
  bound: true,
  overflow: "visible",
});


document.querySelector(".page4 .uses").addEventListener("click", function (e) {
  if (usesFlicking.isPlaying()) {
    e.preventDefault();
  }
});


// page6 - download
var copyInput = document.querySelector("input.copy-input");

copyInput.addEventListener("select", function (e) {
  document.execCommand('copy');
});
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then (function () {
      alert("You have copied the command.");
    }).catch(function () {
      copyTextarea(text);
    });
  } else {
    copyTextarea(text);
  }
}
function copyTextarea(text) {
  var oldContentEditable = copyInput.contentEditable;
  var oldReadOnly = copyInput.readOnly;
  var range = document.createRange();

  copyInput.value = text;
  copyInput.contentEditable = true;
  copyInput.readOnly = false;

  range.selectNodeContents(copyInput);

  var s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  copyInput.setSelectionRange(0, copyInput.value.length); // A big number, to cover anything that could be inside the element.

  copyInput.contentEditable = oldContentEditable;
  copyInput.readOnly = oldReadOnly;
  copyInput.focus();

  document.execCommand('copy');
  alert("You have copied the command.");
}

document.querySelector(".page6 .target.shell").addEventListener("click", function () {
  copyText("npm install @egjs/flicking");
});
