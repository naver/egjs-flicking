/* eslint-disable prefer-arrow/prefer-arrow-functions */
const pages = document.body.querySelectorAll(".page");
let isMobile = false;
let itemHeight = 0;
let currentPage = 0;
let isEnableScroll = true;
let timerId = -1;

function enableScrollTimer() {
  isEnableScroll = false;
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(function() {
    isEnableScroll = true;
  }, 600);
}
function getScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset;
}
function getPage(isNear) {
  const height = itemHeight;
  const scrollTop = getScrollTop();
  const page = Math.floor(scrollTop / height);
  const progress = scrollTop % height;

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
  const page = getPage();

  if (page !== currentPage) {
    changePagination(currentPage, page);
  }
}

function scroll(index) {
  if (!isEnableScroll || !pages[index]) {
    return;
  }
  const scrollTop = getScrollTop();
  const nextTop = pages[index].getBoundingClientRect().top;

  if (nextTop !== 0) {
    Scene.animateItem({
      scrollTop: [scrollTop, scrollTop + nextTop]
    }, {
      fillMode: "forwards",
      easing: Scene.EASE_IN_OUT,
      duration: 0.5
    }).on("animate", function(e) {
      window.scrollTo(0, e.frame.get("scrollTop"));
    });
  }
  enableScrollTimer();
}
const paginationLiElements = document.querySelectorAll(".pagination li");

[].slice.call(paginationLiElements).forEach(function(el, i) {
  el.addEventListener("click", function() {
    scroll(i);
  });
});
window.addEventListener("scroll", check);
window.addEventListener("wheel", function(e) {
  if (!isMobile) {
    e.preventDefault();
    if (isEnableScroll) {
      const page = getPage();
      const delta = e.deltaY;

      if (page === currentPage) {
        if (Math.abs(delta) > 40) {
          if (delta > 0 && page < 6) {
            scroll(page + 1);
          } else if (delta < 0 && page > 0) {
            scroll(page - 1);
          } else {
            scroll(page);
          }
        }
      } else if (page > currentPage && delta > 0 || page < currentPage && delta < 0) {
        currentPage = page;
        scroll(page);
      }
    }
  }
}, {
  passive: false
});

const body = document.body;
function resize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  itemHeight = pages[0].getBoundingClientRect().height;
  isMobile = height < 700 || width < 800;
}

window.addEventListener("resize", resize);

resize();
check();
// page1
let playTimerId = 0;
let step = 0;

const iphoneFlicking = new Flicking(".page1 .iphone .panels", {
  circular: true,
  gap: 10,
  panelEffect: Scene.EASE_IN_OUT
}).on({
  willChange: function(e) {
    step = e.index;
  },
  holdStart: function() {
    pause();
  },
  holdEnd: function(e) {
    play();
  }
});

const progressLiElements = document.querySelectorAll(".progress li");
[].slice.call(progressLiElements).forEach(function(el, i) {
  el.addEventListener("click", function(e) {
    cardFlicking.moveTo(i);
    play();
  });
})

const cardFlicking = new Flicking(".page1 .kingcard .levels", {
  duration: 300,
  panelEffect: Scene.EASE_IN_OUT,
  circular: true
}).on({
  move: function(e) {
    let progress = e.progress;
    const scale = 0.8;
    if (progress < 0.4) {
      progress *= scale;
    } else {
      progress = 0.32 + 0.68 * (progress - 0.4) / 0.6;
    }
    cardScene.setTime((progress * 100) + "%");
  },
  willChange: function(e) {
    step = 4 + e.index;
    progressLiElements[cardFlicking.index].classList.remove("checked");
    progressLiElements[e.index].classList.add("checked");
  },
  holdStart: function(e) {
    pause();
  },
  holdEnd: function(e) {
    play();
  }
});

const cardScene = new Scene({
  ".card-wrapper.forward": {
    0: {
      transform: "rotateY(0deg)"
    },
    2: {
      transform: "rotateY(360deg)"
    }
  },
  ".card-wrapper.backward": {
    0: {
      transform: "rotateY(180deg)"
    },
    2: {
      transform: "rotateY(540deg)"
    }
  },
  ".shadow": {
    0: {
      width: "100px",
      easing: Scene.EASE_IN
    },
    0.5: {
      width: "10px",
      easing: Scene.EASE_OUT
    },
    1: {
      width: "100px"
    },
    options: {
      iterationCount: 2
    }
  }
}, {
  selector: true
}).setTime(0);

const fingerScene = new Scene({
  ".finger": {
    0: {
      transform: {
        translate: "0px",
        rotate: "-20deg"
      },
      opacity: 0
    },
    0.2: {
      opacity: 1
    },
    0.6: {
      transform: {
        translate: "-110px"
      },
      opacity: 1
    },
    0.7: {
      opacity: 0
    },
    options: {
      easing: Scene.EASE_IN_OUT
    }
  }
}, {
  selector: true
}).setTime(0);


function move(cardTransform, iphoneTransform) {
  new Scene({
    ".kingcard": {
      transform: {
        translate: cardTransform
      }
    },
    ".iphone-wrapper": {
      transform: {
        translate: iphoneTransform
      }
    }
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
  const iphoneTransform = step < 4 ? ["0%", "-100%"] : ["100%", "0%"];
  const cardTransform = step < 4 ? ["0%", "-100%"] : ["-100%", "-200%"];

  move(cardTransform, iphoneTransform);
}
document.querySelector(".ex .buttons .prev").addEventListener("click", function() {
  const iphoneTransform = step < 4 ? ["0%", "100%"] : ["-100%", "0%"];
  const cardTransform = step < 4 ? ["-200%", "-100%"] : ["-100%", "0%"];

  move(cardTransform, iphoneTransform);
});
document.querySelector(".ex .buttons .next").addEventListener("click", next);


function play() {
  clearTimeout(playTimerId);
  playTimerId = setTimeout(function() {
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

const featuresFlicking = new Flicking(".page2 .features", {
  align: Flicking.ALIGN.NEXT,
  duration: 500,
  moveType: "snap",
  bound: true
});

// page3
const pluginsFlicking = new Flicking(".page3 .plugins", {
  align: Flicking.ALIGN.PREV,
  duration: 500,
  moveType: "snap",
  bound: true
});

// page4
const usesFlicking = new Flicking(".page4 .uses", {
  align: Flicking.ALIGN.PREV,
  duration: 500,
  moveType: "snap",
  bound: true
});

// page6 - download
const copyInput = document.querySelector("input.copy-input");

copyInput.addEventListener("select", function(e) {
  document.execCommand('copy');
});
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then (function() {
      alert("You have copied the command.");
    }).catch(function() {
      copyTextarea(text);
    });
  } else {
    copyTextarea(text);
  }
}
function copyTextarea(text) {
  const oldContentEditable = copyInput.contentEditable;
  const oldReadOnly = copyInput.readOnly;
  const range = document.createRange();

  copyInput.value = text;
  copyInput.contentEditable = true;
  copyInput.readOnly = false;

  range.selectNodeContents(copyInput);

  const s = window.getSelection();
  s.removeAllRanges();
  s.addRange(range);

  copyInput.setSelectionRange(0, copyInput.value.length); // A big number, to cover anything that could be inside the element.

  copyInput.contentEditable = oldContentEditable;
  copyInput.readOnly = oldReadOnly;
  copyInput.focus();

  document.execCommand('copy');
  alert("You have copied the command.");
}

document.querySelector(".page6 .target.shell").addEventListener("click", function() {
  copyText("npm install @egjs/flicking");
});
