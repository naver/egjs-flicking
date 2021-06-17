/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef } from "react";
import Flicking from "@egjs/react-flicking";
import SourceCode from "@site/src/component/SourceCode";
import CodeBlock from "@theme/CodeBlock";
import Columns from "@site/src/component/Columns";
import ColumnItem from "@site/src/component/ColumnItem";
import "../css/demo/sync.css";

export default () => {
  const flicking0 = useRef<Flicking>();
  const flicking1 = useRef<Flicking>();
  const flicking2 = useRef<Flicking>();

  const update = (flicking: Flicking, progress: number) => {
    flicking.camera.lookAt(flicking.camera.range.min + flicking.camera.rangeDiff * progress);
  };

  const reactSourceCode = `export default () => {
  const flicking0 = useRef();
  const flicking1 = useRef();
  const flicking2 = useRef();

  return <Flicking ref={flicking0}
    className="mb-4"
    align="prev"
    bound={true}
    bounce={30}
    onMove={e => {
      const camera = e.currentTarget.camera;
      const progress = (camera.position - camera.range.min) / camera.rangeDiff;
      update(flicking1.current, progress);
      update(flicking2.current, progress);
    }}
    onMoveStart={() => {
      flicking1.current.disableInput();
      flicking2.current.disableInput();
    }}
    onMoveEnd={() => {
      flicking1.current.enableInput();
      flicking1.current.control.updateInput();
      flicking2.current.enableInput();
      flicking2.current.control.updateInput();
    }}>
    <span className="button mr-2 is-white">🍎 Apple</span>
    <span className="button mr-2 is-white">🍉 Watermelon</span>
    <span className="button mr-2 is-white">🥝 Kiwi</span>
    <span className="button mr-2 is-white">🍌 Banana</span>
    <span className="button mr-2 is-white">🍊 Orange</span>
    <span className="button mr-2 is-white">🍋 Lemon</span>
    <span className="button mr-2 is-white">🍈 Melon</span>
    <span className="button mr-2 is-white">🍑 Peach</span>
    <span className="button mr-2 is-white">🍍 Pineapple</span>
    <span className="button mr-2 is-white">🍓 Strawberry</span>
    <span className="button mr-2 is-white">🍒 Cherry</span>
  </Flicking>
  <Flicking ref={flicking1}
    className="mb-4"
    align="prev"
    bound={true}
    bounce={30}
    onMove={e => {
      const camera = e.currentTarget.camera;
      const progress = (camera.position - camera.range.min) / camera.rangeDiff;
      update(flicking0.current, progress);
      update(flicking2.current, progress);
    }}
    onMoveStart={() => {
      flicking0.current.disableInput();
      flicking2.current.disableInput();
    }}
    onMoveEnd={() => {
      flicking0.current.enableInput();
      flicking0.current.control.updateInput();
      flicking2.current.enableInput();
      flicking2.current.control.updateInput();
    }}>
    <span className="button mr-2 is-white">🍔 Hamburger</span>
    <span className="button mr-2 is-white">🍕 Pizza</span>
    <span className="button mr-2 is-white">🍞 Bread</span>
    <span className="button mr-2 is-white">🍜 Ramen</span>
    <span className="button mr-2 is-white">🍦 Ice cream</span>
    <span className="button mr-2 is-white">🍮 Pudding</span>
    <span className="button mr-2 is-white">🍩 Donut</span>
    <span className="button mr-2 is-white">🍪 Cookie</span>
    <span className="button mr-2 is-white">🍚 Rice</span>
    <span className="button mr-2 is-white">🧀 Cheese</span>
    <span className="button mr-2 is-white">🌭 Hot dog</span>
    <span className="button mr-2 is-white">🥓 Bacon</span>
    <span className="button mr-2 is-white">🥪 Sandwich</span>
  </Flicking>
  <Flicking ref={flicking2}
    align="prev"
    bound={true}
    bounce={30}
    onMove={e => {
      const camera = e.currentTarget.camera;
      const progress = (camera.position - camera.range.min) / camera.rangeDiff;
      update(flicking0.current, progress);
      update(flicking1.current, progress);
    }}
    onMoveStart={() => {
      flicking0.current.disableInput();
      flicking1.current.disableInput();
    }}
    onMoveEnd={() => {
      flicking0.current.enableInput();
      flicking0.current.control.updateInput();
      flicking1.current.enableInput();
      flicking1.current.control.updateInput();
    }}>
    <span className="button mr-2 is-white">🥛 Milk</span>
    <span className="button mr-2 is-white">☕ Coffee</span>
    <span className="button mr-2 is-white">🍵 Green tea</span>
    <span className="button mr-2 is-white">🍺 Beer</span>
    <span className="button mr-2 is-white">🧃 Juice</span>
    <span className="button mr-2 is-white">🍷 Wine</span>
    <span className="button mr-2 is-white">🥃 Whisky</span>
    <span className="button mr-2 is-white">🍸 Cocktail</span>
    <span className="button mr-2 is-white">🍶 Sake</span>
  </Flicking>
};`;

  const vueSourceCode = `<template>
  <div class="wrapper">
    <flicking ref="flicking0" :options="{ bound: true, bounce: 30, align: 'prev' }"
      @move="onMove" @move-start="onMoveStart" @move-end="onMoveEnd">
      <span className="button mr-2 is-white">🍎 Apple</span>
      <span className="button mr-2 is-white">🍉 Watermelon</span>
      <span className="button mr-2 is-white">🥝 Kiwi</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
    <flicking ref="flicking1" :options="{ bound: true, bounce: 30, align: 'prev' }"
      @move="onMove" @move-start="onMoveStart" @move-end="onMoveEnd">
      <span className="button mr-2 is-white">🍔 Hamburger</span>
      <span className="button mr-2 is-white">🍕 Pizza</span>
      <span className="button mr-2 is-white">🍞 Bread</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
    <flicking ref="flicking2" :options="{ bound: true, bounce: 30, align: 'prev' }"
      @move="onMove" @move-start="onMoveStart" @move-end="onMoveEnd">
      <span className="button mr-2 is-white">🥛 Milk</span>
      <span className="button mr-2 is-white">☕ Coffee</span>
      <span className="button mr-2 is-white">🍵 Green tea</span>
      <span className="button mr-2 is-white">...</span>
    </flicking>
  </div>
</template>
<script>
export default {
  methods: {
    onMove(e) {
      const camera = e.currentTarget.camera;
      const progress = (camera.position - camera.range.min) / camera.rangeDiff;
      const others = [this.$refs.flicking0, this.$refs.flicking1, this.$refs.flicking2];
      others.splice(others.findIndex(val => val === e.currentTarget), 1);

      others.forEach(otherFlicking => {
        otherFlicking.camera.lookAt(otherFlicking.camera.range.min + otherFlicking.camera.rangeDiff * progress);
      });
    },
    onMoveStart(e) {
      const others = [this.$refs.flicking0, this.$refs.flicking1, this.$refs.flicking2];
      others.splice(others.findIndex(val => val === e.currentTarget), 1);

      others.forEach(otherFlicking => {
        otherFlicking.disableInput();
      });
    },
    onMoveEnd(e) {
      const others = [this.$refs.flicking0, this.$refs.flicking1, this.$refs.flicking2];
      others.splice(others.findIndex(val => val === e.currentTarget), 1);

      others.forEach(otherFlicking => {
        otherFlicking.enableInput();
        otherFlicking.control.updateInput();
      });
    }
  }
}
</script>`;

  return <><div className="has-background-grey-lighter p-4 mb-4">
    <Flicking ref={flicking0}
      className="mb-4"
      align="prev"
      bound={true}
      bounce={30}
      onMove={e => {
        const camera = e.currentTarget.camera;
        const progress = (camera.position - camera.range.min) / camera.rangeDiff;
        update(flicking1.current, progress);
        update(flicking2.current, progress);
      }}
      onMoveStart={() => {
        flicking1.current.disableInput();
        flicking2.current.disableInput();
      }}
      onMoveEnd={() => {
        flicking1.current.enableInput();
        flicking1.current.control.updateInput();
        flicking2.current.enableInput();
        flicking2.current.control.updateInput();
      }}>
      <span className="button mr-2 is-white">🍎 Apple</span>
      <span className="button mr-2 is-white">🍉 Watermelon</span>
      <span className="button mr-2 is-white">🥝 Kiwi</span>
      <span className="button mr-2 is-white">🍌 Banana</span>
      <span className="button mr-2 is-white">🍊 Orange</span>
      <span className="button mr-2 is-white">🍋 Lemon</span>
      <span className="button mr-2 is-white">🍈 Melon</span>
      <span className="button mr-2 is-white">🍑 Peach</span>
      <span className="button mr-2 is-white">🍍 Pineapple</span>
      <span className="button mr-2 is-white">🍓 Strawberry</span>
      <span className="button mr-2 is-white">🍒 Cherry</span>
    </Flicking>
    <Flicking ref={flicking1}
      className="mb-4"
      align="prev"
      bound={true}
      bounce={30}
      onMove={e => {
        const camera = e.currentTarget.camera;
        const progress = (camera.position - camera.range.min) / camera.rangeDiff;
        update(flicking0.current, progress);
        update(flicking2.current, progress);
      }}
      onMoveStart={() => {
        flicking0.current.disableInput();
        flicking2.current.disableInput();
      }}
      onMoveEnd={() => {
        flicking0.current.enableInput();
        flicking0.current.control.updateInput();
        flicking2.current.enableInput();
        flicking2.current.control.updateInput();
      }}>
      <span className="button mr-2 is-white">🍔 Hamburger</span>
      <span className="button mr-2 is-white">🍕 Pizza</span>
      <span className="button mr-2 is-white">🍞 Bread</span>
      <span className="button mr-2 is-white">🍜 Ramen</span>
      <span className="button mr-2 is-white">🍦 Ice cream</span>
      <span className="button mr-2 is-white">🍮 Pudding</span>
      <span className="button mr-2 is-white">🍩 Donut</span>
      <span className="button mr-2 is-white">🍪 Cookie</span>
      <span className="button mr-2 is-white">🍚 Rice</span>
      <span className="button mr-2 is-white">🧀 Cheese</span>
      <span className="button mr-2 is-white">🌭 Hot dog</span>
      <span className="button mr-2 is-white">🥓 Bacon</span>
      <span className="button mr-2 is-white">🥪 Sandwich</span>
    </Flicking>
    <Flicking ref={flicking2}
      align="prev"
      bound={true}
      bounce={30}
      onMove={e => {
        const camera = e.currentTarget.camera;
        const progress = (camera.position - camera.range.min) / camera.rangeDiff;
        update(flicking0.current, progress);
        update(flicking1.current, progress);
      }}
      onMoveStart={() => {
        flicking0.current.disableInput();
        flicking1.current.disableInput();
      }}
      onMoveEnd={() => {
        flicking0.current.enableInput();
        flicking0.current.control.updateInput();
        flicking1.current.enableInput();
        flicking1.current.control.updateInput();
      }}>
      <span className="button mr-2 is-white">🥛 Milk</span>
      <span className="button mr-2 is-white">☕ Coffee</span>
      <span className="button mr-2 is-white">🍵 Green tea</span>
      <span className="button mr-2 is-white">🍺 Beer</span>
      <span className="button mr-2 is-white">🧃 Juice</span>
      <span className="button mr-2 is-white">🍷 Wine</span>
      <span className="button mr-2 is-white">🥃 Whisky</span>
      <span className="button mr-2 is-white">🍸 Cocktail</span>
      <span className="button mr-2 is-white">🍶 Sake</span>
    </Flicking>
  </div>
  <SourceCode
    options={{ bound: true, bounce: 30, align: "prev" }} panels={[]}
    js={
      <Columns>
        <ColumnItem is={6}>
          <CodeBlock className="html" title="html">
            {`<div id="flick0" class="flicking-viewport">
  <div class="flicking-camera">
    <span className="button mr-2 is-white">🍎 Apple</span>
    <span className="button mr-2 is-white">🍉 Watermelon</span>
    <span className="button mr-2 is-white">🥝 Kiwi</span>
    <span className="button mr-2 is-white">...</span>
  </div>
</div>
<div id="flick1" class="flicking-viewport">
  <div class="flicking-camera">
    <span className="button mr-2 is-white">🍔 Hamburger</span>
    <span className="button mr-2 is-white">🍕 Pizza</span>
    <span className="button mr-2 is-white">🍞 Bread</span>
    <span className="button mr-2 is-white">...</span>
  </div>
</div>
<div id="flick2" class="flicking-viewport">
  <div class="flicking-camera">
    <span className="button mr-2 is-white">🥛 Milk</span>
    <span className="button mr-2 is-white">☕ Coffee</span>
    <span className="button mr-2 is-white">🍵 Green tea</span>
    <span className="button mr-2 is-white">...</span>
  </div>
</div>`}
          </CodeBlock>
        </ColumnItem>
        <ColumnItem is={6}>
          <CodeBlock className="js" title="js">
            {`import Flicking, { ALIGN, EVENTS } from "@egjs/flicking";

const flicking0 = new Flicking("#flick0", {
  bound: true,
  bounce: 30,
  align: ALIGN.PREV
});

const flicking1 = new Flicking("#flick1", {
  bound: true,
  bounce: 30,
  align: ALIGN.PREV
});

const flicking2 = new Flicking("#flick2", {
  bound: true,
  bounce: 30,
  align: ALIGN.PREV
});

const flickings = [flicking0, flicking1, flicking2];

flickings.forEach((flicking, idx) => {
  const others = [...flickings];
  others.splice(idx, 1);

  flicking.on({
    [EVENTS.MOVE]: e => {
      const camera = e.currentTarget.camera;
      const progress = (camera.position - camera.range.min) / camera.rangeDiff;

      others.forEach(otherFlicking => {
        otherFlicking.camera.lookAt(otherFlicking.camera.range.min + otherFlicking.camera.rangeDiff * progress);
      });
    },
    [EVENTS.MOVE_START]: e => {
      others.forEach(otherFlicking => {
        otherFlicking.disableInput();
      });
    },
    [EVENTS.MOVE_END]: e => {
      others.forEach(otherFlicking => {
        otherFlicking.enableInput();
        otherFlicking.control.updateInput();
      });
    }
  })
})`}
          </CodeBlock>
        </ColumnItem>
      </Columns>
    }
    react={
      <CodeBlock className="jsx">
        { reactSourceCode }
      </CodeBlock>
    }
    vue={
      <CodeBlock className="html">
        { vueSourceCode }
      </CodeBlock>
    }
    vue3={
      <CodeBlock className="html">
        { vueSourceCode }
      </CodeBlock>
    }
    angular={
      <><CodeBlock className="html" title="app.component.html">
        { `<ngx-flicking #flicking0 [options]="{ bound: true, bounce: 30, align: 'prev' }"
  (move)="onMove($event, 0)" (moveStart)="onMoveStart($event, 0)" (moveEnd)="onMoveEnd($event, 0)">
  <span flicking-panel className="button mr-2 is-white">🍎 Apple</span>
  <span flicking-panel className="button mr-2 is-white">🍉 Watermelon</span>
  <span flicking-panel className="button mr-2 is-white">🥝 Kiwi</span>
  <span flicking-panel className="button mr-2 is-white">...</span>
</ngx-flicking>
<ngx-flicking #flicking1 [options]="{ bound: true, bounce: 30, align: 'prev' }"
  (move)="onMove($event, 1)" (moveStart)="onMoveStart($event, 1)" (moveEnd)="onMoveEnd($event, 1)">
  <span flicking-panel className="button mr-2 is-white">🍔 Hamburger</span>
  <span flicking-panel className="button mr-2 is-white">🍕 Pizza</span>
  <span flicking-panel className="button mr-2 is-white">🍞 Bread</span>
  <span flicking-panel className="button mr-2 is-white">...</span>
</ngx-flicking>
<ngx-flicking #flicking2 [options]="{ bound: true, bounce: 30, align: 'prev' }"
  (move)="onMove($event, 2)" (moveStart)="onMoveStart($event, 2)" (moveEnd)="onMoveEnd($event, 2)">
  <span flicking-panel className="button mr-2 is-white">🥛 Milk</span>
  <span flicking-panel className="button mr-2 is-white">☕ Coffee</span>
  <span flicking-panel className="button mr-2 is-white">🍵 Green tea</span>
  <span flicking-panel className="button mr-2 is-white">...</span>
</ngx-flicking>` }
      </CodeBlock>
      <CodeBlock className="js" title="app.component.ts">
        {`@Component({})
export class DemoFlickingComponent {
  @ViewChild("flicking0") flicking0: NgxFlickingComponent;
  @ViewChild("flicking1") flicking1: NgxFlickingComponent;
  @ViewChild("flicking2") flicking2: NgxFlickingComponent;

  onMove(e, idx) {
    const flickings = [this.flicking0, this.flicking1, this.flicking2];
    flickings.splice(idx, 1);

    const camera = e.currentTarget.camera;
    const progress = (camera.position - camera.range.min) / camera.rangeDiff;

    flickings.forEach(otherFlicking => {
      otherFlicking.camera.lookAt(otherFlicking.camera.range.min + otherFlicking.camera.rangeDiff * progress);
    });
  }

  onMoveStart(e, idx) {
    const flickings = [this.flicking0, this.flicking1, this.flicking2];
    flickings.splice(idx, 1);

    flickings.forEach(otherFlicking => {
      otherFlicking.disableInput();
    });
  }

  onMoveEnd(e, idx) {
    const flickings = [this.flicking0, this.flicking1, this.flicking2];
    flickings.splice(idx, 1);

    flickings.forEach(otherFlicking => {
      otherFlicking.enableInput();
      otherFlicking.control.updateInput();
    });
  }
}`}
      </CodeBlock></>
    }
    preact={
      <CodeBlock className="jsx">
        { reactSourceCode }
      </CodeBlock>
    }
  />
  </>;
};
