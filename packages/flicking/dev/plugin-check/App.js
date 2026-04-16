/**
 * 플러그인 마이그레이션 검증용 (임시)
 * docs 데모 추가 후 제거 예정
 *
 * 참고: https://naver.github.io/egjs-flicking/ko/Plugins
 */
import Flicking from "@dev/flicking";
import { Arrow, AutoPlay, Fade, Pagination, Parallax, Perspective, Sync } from "@dev/plugins";

const panelStyle =
  "min-width: 200px; height: 160px; margin: 0 5px; background: #e0e7ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: bold; overflow: hidden;";
const imgPanelStyle = "position: relative; width: 100%; height: 200px; overflow: hidden;";
const imgStyle = "width: 100%; height: 100%; object-fit: cover;";
const thumbPanelStyle =
  "width: 100px; height: 70px; margin: 0 2px; overflow: hidden; opacity: 0.5; transition: opacity 0.3s;";
const syncItemStyle =
  "display: inline-block; padding: 8px 16px; margin: 0 4px; background: #f5f5f5; border-radius: 4px; white-space: nowrap;";

const images = [
  "https://picsum.photos/seed/a/600/300",
  "https://picsum.photos/seed/b/600/300",
  "https://picsum.photos/seed/c/600/300",
  "https://picsum.photos/seed/d/600/300",
  "https://picsum.photos/seed/e/600/300",
  "https://picsum.photos/seed/f/600/300"
];

const fruits = [
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
];
const foods = [
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
];
const drinks = [
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
];

function panels(count) {
  return Array.from({ length: count }, (_, i) => `<div style="${panelStyle}">${i + 1}</div>`).join("");
}

function imgPanels(srcs) {
  return srcs.map(src => `<div style="${imgPanelStyle}"><img style="${imgStyle}" src="${src}" /></div>`).join("");
}

function syncItems(items) {
  return items.map(item => `<span style="${syncItemStyle}">${item}</span>`).join("");
}

export function createApp(container) {
  container.innerHTML = `
    <div style="max-width: 640px; margin: 0 auto; padding: 20px;">
      <h1>Plugin Check</h1>
      <p style="font-size: 12px; color: #666; margin-top: 8px;">마이그레이션 검증용 — docs 데모 추가 후 제거 예정</p>

      <!-- Arrow -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">Arrow</div>
        <div id="arrow" class="flicking-viewport">
          <div class="flicking-camera">${panels(5)}</div>
          <span class="flicking-arrow-prev"></span>
          <span class="flicking-arrow-next"></span>
        </div>
      </div>

      <!-- AutoPlay -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">AutoPlay</div>
        <div id="autoplay" class="flicking-viewport">
          <div class="flicking-camera">${imgPanels(images.slice(0, 3))}</div>
        </div>
      </div>

      <!-- Pagination -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">Pagination (bullet)</div>
        <div id="pagination" class="flicking-viewport">
          <div class="flicking-camera">${panels(8)}</div>
          <div class="flicking-pagination"></div>
        </div>
      </div>

      <!-- Fade -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">Fade</div>
        <div id="fade" class="flicking-viewport">
          <div class="flicking-camera">${imgPanels(images.slice(0, 3))}</div>
        </div>
      </div>

      <!-- Parallax -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">Parallax</div>
        <div id="parallax" class="flicking-viewport">
          <div class="flicking-camera">
            ${images
              .slice(0, 3)
              .map(
                src =>
                  `<div style="${imgPanelStyle} width: 100%;"><img style="${imgStyle} width: 150%; max-width: none;" src="${src}" /></div>`
              )
              .join("")}
          </div>
        </div>
      </div>

      <!-- Perspective -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">Perspective</div>
        <div id="perspective" class="flicking-viewport">
          <div class="flicking-camera">${panels(5)}</div>
        </div>
      </div>

      <!-- Sync (camera) -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">Sync (camera)</div>
        <div id="sync-cam-0" class="flicking-viewport">
          <div class="flicking-camera">${syncItems(fruits)}</div>
        </div>
        <div id="sync-cam-1" class="flicking-viewport" style="margin-top: 4px;">
          <div class="flicking-camera">${syncItems(foods)}</div>
        </div>
        <div id="sync-cam-2" class="flicking-viewport" style="margin-top: 4px;">
          <div class="flicking-camera">${syncItems(drinks)}</div>
        </div>
      </div>

      <!-- Sync (index + thumbnail) -->
      <div style="margin-bottom: 48px;">
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 12px; border-bottom: 2px solid #333; padding-bottom: 4px;">Sync (index + thumbnail)</div>
        <div id="sync-main" class="flicking-viewport">
          <div class="flicking-camera">${imgPanels(images)}</div>
        </div>
        <div id="sync-thumb" class="flicking-viewport" style="margin-top: 8px;">
          <div class="flicking-camera">
            ${images.map(src => `<div style="${thumbPanelStyle}"><img style="${imgStyle}" src="${src}" /></div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;

  // Arrow
  const arrowFlicking = new Flicking("#arrow", { circular: true });
  arrowFlicking.addPlugins(new Arrow());

  // AutoPlay
  const autoplayFlicking = new Flicking("#autoplay", { circular: true, preventDefaultOnDrag: true });
  autoplayFlicking.addPlugins(new AutoPlay());

  // Pagination
  const paginationFlicking = new Flicking("#pagination", { circular: true });
  paginationFlicking.addPlugins(new Pagination({ type: "bullet" }));

  // Fade
  const fadeFlicking = new Flicking("#fade", { circular: true, preventDefaultOnDrag: true });
  fadeFlicking.addPlugins(new Fade());

  // Parallax
  const parallaxFlicking = new Flicking("#parallax", { circular: true, preventDefaultOnDrag: true, gap: 2 });
  parallaxFlicking.addPlugins(new Parallax("img"));

  // Perspective
  const perspectiveFlicking = new Flicking("#perspective", { circular: true });
  perspectiveFlicking.addPlugins(new Perspective({ rotate: 1, scale: 2, perspective: 600 }));

  // Sync (camera)
  const syncCam0 = new Flicking("#sync-cam-0", { align: "prev", bound: true, bounce: 30 });
  const syncCam1 = new Flicking("#sync-cam-1", { align: "prev", bound: true, bounce: 30 });
  const syncCam2 = new Flicking("#sync-cam-2", { align: "prev", bound: true, bounce: 30 });
  syncCam0.addPlugins(
    new Sync({
      type: "camera",
      synchronizedFlickingOptions: [
        { flicking: syncCam0, isClickable: false },
        { flicking: syncCam1, isClickable: false },
        { flicking: syncCam2, isClickable: false }
      ]
    })
  );

  // Sync (index + thumbnail)
  const syncMain = new Flicking("#sync-main", { bounce: 30, preventDefaultOnDrag: true });
  const syncThumb = new Flicking("#sync-thumb", {
    moveType: "freeScroll",
    bound: true,
    bounce: 30,
    preventDefaultOnDrag: true
  });
  syncMain.addPlugins(
    new Sync({
      type: "index",
      synchronizedFlickingOptions: [
        { flicking: syncMain, isSlidable: true },
        { flicking: syncThumb, isClickable: true, activeClass: "active" }
      ]
    })
  );
}
