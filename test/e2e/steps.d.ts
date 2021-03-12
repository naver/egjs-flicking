/// <reference types='codeceptjs' />
type CFCHelper = typeof import("./helper/CFCHelper")["default"]["prototype"];

declare namespace CodeceptJS {
  interface SupportObject { I: I }
  interface Methods extends Playwright, CFCHelper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
