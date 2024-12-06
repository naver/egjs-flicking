const flicking = new Flicking.CrossFlicking("#flicking", {
  autoInit: false,
  verticalOptions: {
    moveType: "strict"
    // horizontal: false,
    // defaultIndex: panel.start,
    // autoInit: false,
    // panelsPerView: 1,
    // duration: 300,
    // renderOnlyVisible: true,
    // preventDefaultOnDrag: true,
  },
});
console.log(flicking.camera);

flicking.init();
/*

const onChildChange = (e) => {
  // flicking.visiblePanels.length 가 2보다 크다면 가로 방향 Flicking이 조작 중이라는 것을 의미합니다.
  // 이 경우 가로 방향 Flicking의 이동이 완전히 끝난 뒤 onMoveEnd 에서 moveToCategory 을 할 것이므로 여기서는 하지 않습니다.
  if (flicking.visiblePanels.length < 2 && panels[flicking.index].flicking === e.currentTarget) {
    syncToCategory(e.index, flicking.index);
  }
};

flicking.init();

flicking.on("ready", () => {
  panels.forEach((panel, i) => {
    panel.flicking.on("changed", onChildChange);
    panel.flicking.init();
  });
})

/*
하나의 Panel에 몇 개의 세로 Panel이 해당되는가? -> 최대 10개
*/
