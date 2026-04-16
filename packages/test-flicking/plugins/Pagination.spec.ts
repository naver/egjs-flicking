import Pagination from "../../flicking-plugins/src/pagination/Pagination";
import { cleanup, createFlicking, createPaginationFixture, sandbox } from "./utils";

describe("Pagination", () => {
  afterEach(() => {
    cleanup();
  });

  const createFixture = () => {
    const fixtureWrapper = sandbox("pagination");
    const fixture = createPaginationFixture();
    fixtureWrapper.appendChild(fixture);

    return fixture;
  };

  describe("Options", () => {
    describe("renderBullet", () => {
      it("should not remove custom classes when the 'scroll' type is used", async () => {
        // Given
        const flicking = await createFlicking(createFixture());
        const pagination = new Pagination({
          renderBullet: (className: string) => `<span class="${className} test"></span>`,
          type: "scroll"
        });

        // When
        pagination.init(flicking);

        // Then
        const bullets = [].slice.apply(document.querySelectorAll(".flicking-pagination-bullet"));
        expect(bullets.every(bullet => bullet.classList.contains("test"))).toBe(true);
      });
    });

    describe("renderActiveBullet", () => {
      it("is false by default", async () => {
        // Given
        const flicking = await createFlicking(createFixture());
        const pagination = new Pagination();

        // When
        pagination.init(flicking);

        // Then
        expect(pagination.renderActiveBullet).toBeNull();
      });

      it("should render active bullet if a render function is given", async () => {
        // Given
        const flicking = await createFlicking(createFixture());
        const pagination = new Pagination({
          type: "bullet", // default
          renderActiveBullet: className => `<span class="${className}">ACTIVE</span>`
        });

        // When
        pagination.init(flicking);

        // Then
        const activeBullet = document.querySelector(".flicking-pagination-bullet-active");
        expect(activeBullet).not.toBeNull();
        expect(activeBullet?.innerHTML).toBe("ACTIVE");
      });

      it("should render active bullet if a render function is given & type is scroll", async () => {
        // Given
        const flicking = await createFlicking(createFixture());
        const pagination = new Pagination({
          type: "scroll",
          renderActiveBullet: className => `<span class="${className}">ACTIVE</span>`
        });

        // When
        pagination.init(flicking);

        // Then
        const activeBullet = document.querySelector(".flicking-pagination-bullet-active");
        expect(activeBullet).not.toBeNull();
        expect(activeBullet?.innerHTML).toBe("ACTIVE");
      });
    });
  });

  describe("Index change", () => {
    it("should not throw any error while Flicking is replacing all panels", async () => {
      // Given
      const flicking = await createFlicking(createFixture());
      const pagination = new Pagination({
        renderBullet: (className: string) => `<span class="${className} test"></span>`,
        type: "bullet"
      });

      // When
      pagination.init(flicking);
      flicking.remove(0, flicking.panelCount);
      flicking.append(document.createElement("div"));

      // Then
      // There should be one active bullet selected
      const bullets = [].slice.apply(document.querySelectorAll(".flicking-pagination-bullet-active"));
      expect(bullets.length).toBe(1);
    });
  });

  describe("Events", () => {
    let addEventListenerCalls: Array<{ thisValue: any; args: any[] }>;
    let originalAddEventListener: typeof HTMLElement.prototype.addEventListener;

    beforeEach(() => {
      addEventListenerCalls = [];
      originalAddEventListener = HTMLElement.prototype.addEventListener;
      HTMLElement.prototype.addEventListener = function (this: HTMLElement, ...args: any[]) {
        addEventListenerCalls.push({ thisValue: this, args });
        return originalAddEventListener.apply(this, args as any);
      };
    });

    afterEach(() => {
      HTMLElement.prototype.addEventListener = originalAddEventListener;
    });

    it("should add touch start listener with passive: true", async () => {
      // Given
      const flicking = await createFlicking(createFixture());
      const pagination = new Pagination();

      // When
      flicking.addPlugins(pagination);
      await flicking.init();

      // Then
      const touchStartEvents = addEventListenerCalls.filter(call => {
        return call.args[0] === "touchstart" && call.thisValue.classList?.contains("flicking-pagination-bullet");
      });

      expect(touchStartEvents.length).toBeGreaterThan(0);
      expect(
        touchStartEvents.every(call => {
          const [type, _, options] = call.args;
          return type === "touchstart" && options && (options as AddEventListenerOptions).passive;
        })
      ).toBe(true);
    });
  });
});
