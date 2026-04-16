/**
 * 플러그인 마이그레이션 검증용 (임시)
 * docs 데모 추가 후 제거 예정
 *
 * 참고: https://naver.github.io/egjs-flicking/ko/Plugins
 */

import { Arrow, AutoPlay, Fade, Pagination, Parallax, Perspective, Sync } from "@dev/plugins";
import Flicking, { ViewportSlot } from "@dev/react-flicking";
import { useEffect, useRef, useState } from "react";

const css: Record<string, React.CSSProperties> = {
  section: {
    marginBottom: 48
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    borderBottom: "2px solid #333",
    paddingBottom: 4
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginTop: 8
  },
  panel: {
    minWidth: 200,
    height: 160,
    margin: "0 5px",
    background: "#e0e7ff",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
    overflow: "hidden"
  },
  pluginsPanel: {
    position: "relative",
    width: "100%",
    height: 200,
    overflow: "hidden"
  },
  panelImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  thumbPanel: {
    width: 100,
    height: 70,
    margin: "0 2px",
    overflow: "hidden",
    opacity: 0.5,
    transition: "opacity 0.3s"
  },
  thumbImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  syncItem: {
    display: "inline-block",
    padding: "8px 16px",
    margin: "0 4px",
    background: "#f5f5f5",
    borderRadius: 4,
    whiteSpace: "nowrap"
  }
};

const images = [
  "https://picsum.photos/seed/a/600/300",
  "https://picsum.photos/seed/b/600/300",
  "https://picsum.photos/seed/c/600/300",
  "https://picsum.photos/seed/d/600/300",
  "https://picsum.photos/seed/e/600/300",
  "https://picsum.photos/seed/f/600/300"
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={css.section}>
      <div style={css.title}>{title}</div>
      {children}
    </div>
  );
}

/* ── Arrow ── */
function ArrowCheck() {
  const plugins = [new Arrow()];

  return (
    <Section title="Arrow">
      <Flicking circular={true} plugins={plugins}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={css.panel}>
            {n}
          </div>
        ))}
        <ViewportSlot>
          <span className="flicking-arrow-prev"></span>
          <span className="flicking-arrow-next"></span>
        </ViewportSlot>
      </Flicking>
    </Section>
  );
}

/* ── AutoPlay ── */
function AutoPlayCheck() {
  const plugins = [new AutoPlay()];

  return (
    <Section title="AutoPlay">
      <Flicking circular={true} preventDefaultOnDrag={true} plugins={plugins}>
        {images.slice(0, 3).map((src, i) => (
          <div key={i} style={css.pluginsPanel}>
            <img style={css.panelImage} src={src} />
          </div>
        ))}
      </Flicking>
    </Section>
  );
}

/* ── Pagination (bullet) ── */
function PaginationCheck() {
  const plugins = [new Pagination({ type: "bullet" })];

  return (
    <Section title="Pagination (bullet)">
      <Flicking circular={true} plugins={plugins}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
          <div key={n} style={css.panel}>
            {n}
          </div>
        ))}
        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>
    </Section>
  );
}

/* ── Fade ── */
function FadeCheck() {
  const plugins = [new Fade()];

  return (
    <Section title="Fade">
      <Flicking circular={true} preventDefaultOnDrag={true} plugins={plugins}>
        {images.slice(0, 3).map((src, i) => (
          <div key={i} style={css.pluginsPanel}>
            <img style={css.panelImage} src={src} />
          </div>
        ))}
      </Flicking>
    </Section>
  );
}

/* ── Parallax ── */
function ParallaxCheck() {
  const plugins = [new Parallax("img")];

  return (
    <Section title="Parallax">
      <Flicking className="parallax" circular={true} preventDefaultOnDrag={true} plugins={plugins} gap={2}>
        {images.slice(0, 3).map((src, i) => (
          <div key={i} style={{ ...css.pluginsPanel, width: "100%" }}>
            <img style={{ ...css.panelImage, width: "150%", maxWidth: "none" }} src={src} />
          </div>
        ))}
      </Flicking>
    </Section>
  );
}

/* ── Perspective ── */
function PerspectiveCheck() {
  const plugins = [new Perspective({ rotate: 1, scale: 2, perspective: 600 })];

  return (
    <Section title="Perspective">
      <Flicking circular={true} plugins={plugins}>
        {[1, 2, 3, 4, 5].map(n => (
          <div key={n} style={css.panel}>
            {n}
          </div>
        ))}
      </Flicking>
    </Section>
  );
}

/* ── Sync (camera) ── */
function SyncCameraCheck() {
  const flicking0 = useRef<Flicking>(null);
  const flicking1 = useRef<Flicking>(null);
  const flicking2 = useRef<Flicking>(null);
  const [plugins, setPlugins] = useState<Sync[]>([]);

  useEffect(() => {
    setPlugins([
      new Sync({
        type: "camera",
        synchronizedFlickingOptions: [
          { flicking: flicking0.current!, isClickable: false },
          { flicking: flicking1.current!, isClickable: false },
          { flicking: flicking2.current!, isClickable: false }
        ]
      })
    ]);
  }, []);

  return (
    <Section title="Sync (camera)">
      <Flicking ref={flicking0} align="prev" bound={true} bounce={30} plugins={plugins}>
        {[
          "🍎 Apple",
          "🍉 Watermelon",
          "🥝 Kiwi",
          "🍊 Orange",
          "🍇 Grape",
          "🍓 Strawberry",
          "🍑 Peach",
          "🍋 Lemon",
          "🫐 Blueberry",
          "🍌 Banana"
        ].map(item => (
          <span key={item} style={css.syncItem}>
            {item}
          </span>
        ))}
      </Flicking>
      <div style={{ marginTop: 4 }}>
        <Flicking ref={flicking1} align="prev" bound={true} bounce={30}>
          {[
            "🍔 Hamburger",
            "🍕 Pizza",
            "🍞 Bread",
            "🌮 Taco",
            "🍜 Ramen",
            "🍣 Sushi",
            "🥗 Salad",
            "🍝 Pasta",
            "🥘 Stew",
            "🍱 Bento"
          ].map(item => (
            <span key={item} style={css.syncItem}>
              {item}
            </span>
          ))}
        </Flicking>
      </div>
      <div style={{ marginTop: 4 }}>
        <Flicking ref={flicking2} align="prev" bound={true} bounce={30}>
          {[
            "🥛 Milk",
            "☕ Coffee",
            "🍵 Green tea",
            "🧃 Juice",
            "🥤 Soda",
            "🍺 Beer",
            "🧋 Bubble tea",
            "🍷 Wine",
            "🥥 Coconut",
            "🍶 Sake"
          ].map(item => (
            <span key={item} style={css.syncItem}>
              {item}
            </span>
          ))}
        </Flicking>
      </div>
    </Section>
  );
}

/* ── Sync (index + thumbnail) ── */
function SyncIndexCheck() {
  const mainRef = useRef<Flicking>(null);
  const thumbRef = useRef<Flicking>(null);
  const [plugins, setPlugins] = useState<Sync[]>([]);

  useEffect(() => {
    setPlugins([
      new Sync({
        type: "index",
        synchronizedFlickingOptions: [
          { flicking: mainRef.current!, isSlidable: true },
          { flicking: thumbRef.current!, isClickable: true, activeClass: "active" }
        ]
      })
    ]);
  }, []);

  return (
    <Section title="Sync (index + thumbnail)">
      <Flicking ref={mainRef} bounce={30} preventDefaultOnDrag={true} plugins={plugins}>
        {images.map((src, i) => (
          <div key={i} style={css.pluginsPanel}>
            <img style={css.panelImage} src={src} />
          </div>
        ))}
      </Flicking>
      <div style={{ marginTop: 8 }}>
        <Flicking ref={thumbRef} moveType="freeScroll" bound={true} bounce={30} preventDefaultOnDrag={true}>
          {images.map((src, i) => (
            <div key={i} style={css.thumbPanel}>
              <img style={css.thumbImage} src={src} />
            </div>
          ))}
        </Flicking>
      </div>
    </Section>
  );
}

export default function App() {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 20 }}>
      <h1>Plugin Check</h1>
      <p style={css.note}>마이그레이션 검증용 — docs 데모 추가 후 제거 예정</p>
      <ArrowCheck />
      <AutoPlayCheck />
      <PaginationCheck />
      <FadeCheck />
      <ParallaxCheck />
      <PerspectiveCheck />
      <SyncCameraCheck />
      <SyncIndexCheck />
    </div>
  );
}
